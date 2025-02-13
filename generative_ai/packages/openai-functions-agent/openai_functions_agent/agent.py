from typing import List, Tuple

from langchain.agents import AgentExecutor
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents.output_parsers import OpenAIFunctionsAgentOutputParser
from langchain.agents.format_scratchpad import format_to_openai_function_messages
from langchain_community.tools.convert_to_openai import format_tool_to_openai_function
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain.tools.retriever import create_retriever_tool


from langchain_community.chat_models import ChatOpenAI
from langchain_community.embeddings import OpenAIEmbeddings

from langchain_core.pydantic_v1 import BaseModel

from langchain_community.vectorstores import Pinecone as PC
from pinecone import Pinecone

import os

os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"
os.environ['PINECONE_API_KEY'] = 'a89c0db2-bf43-4d8b-ad20-6a78f6a460aa'

vectorstore_tools_description = (
 "Alat untuk membantu dokumentasi tentang dukungan layanan pembuatan akta tanah menggunakan blockchain"
 "Gunakan alat ini untuk mencari informasi mengenai cara membuat surat tanah dan permohonan balik nama surat tanah."
 "Buatlah jawaban sedetail mungkin agar pengguna dapat memahami maksudnya"
 "'Selalu ucapkan 'Terima kasih telah bertanya!' dan menggunakan Bahasa Indonesia"
 "Jika anda tidak menggunakan tools docstore untuk menjawab maka jawab saja 'Maaf saya tidak mengetahui jawabanya, terimakasih!' "
)

vectordb = Pinecone(
    api_key=os.environ.get("PINECONE_API_KEY")
)

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
docsearch = PC.from_existing_index("landspire", embeddings)

retriever = docsearch.as_retriever()

vectorstore_tool = create_retriever_tool(retriever, "docstore", vectorstore_tools_description)

tools = [vectorstore_tool]

# Set up LLM
llm = ChatOpenAI(
    model="gpt-4o",
    # model="gpt-3.5-turbo",
    temperature=0.5,
    max_tokens=3048,
    cache=True,
)

assistant_system_message = """You are a helpful assistant. \
If the docstore tools don't provide relevant information then don't make an answer, just say 'Maaf saya tidak mengetahui jawabanya, terimakasih'"""
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", assistant_system_message),
        MessagesPlaceholder(variable_name="chat_history"),
        ("user", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ]
)

llm_with_tools = llm.bind(functions=[format_tool_to_openai_function(t) for t in tools])


def _format_chat_history(chat_history: List[Tuple[str, str]]):
    buffer = []
    for human, ai in chat_history:
        buffer.append(HumanMessage(content=human))
        buffer.append(AIMessage(content=ai))
    return buffer


agent = (
    {
        "input": lambda x: x["input"],
        "chat_history": lambda x: _format_chat_history(x["chat_history"]),
        "agent_scratchpad": lambda x: format_to_openai_function_messages(
            x["intermediate_steps"]
        ),
    }
    | prompt
    | llm_with_tools
    | OpenAIFunctionsAgentOutputParser()
)


class AgentInput(BaseModel):
    input: str
    chat_history: List[Tuple[str, str]] = Field(
        ..., extra={"widget": {"type": "chat", "input": "input", "output": "output"}}
    )


agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True).with_types(
    input_type=AgentInput
)
