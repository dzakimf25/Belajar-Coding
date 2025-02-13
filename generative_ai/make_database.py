from langchain_community.document_loaders import WebBaseLoader

from langchain_community.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec

import os

os.environ['PINECONE_API_KEY'] = 'a89c0db2-bf43-4d8b-ad20-6a78f6a460aa'
os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"

urls = [
    "https://www.iwmf.org/reporting/persiapan-difabel-sebelum-mencari-kerja/",
    "https://www.iwmf.org/reporting/platform-penyedia-lowongan-kerja-untuk-difabel/",
    "https://sitekad.sehatidifabel.id/webpage/Tentang/",
    "https://www.bfi.co.id/id/blog/cara-membuat-sertifikat-tanah-dengan-mudah-bebas-jasa-calo",
    "https://www.detik.com/properti/tips-dan-panduan/d-7189056/tahapan-syarat-dan-proses-pembuatan-sertifikat-tanah-secara-mandiri-dan-ptsl",
    "https://www.rumah123.com/panduan-properti/tips-properti-73562-membuat-sertifikat-tanah-mudah-id.html",
    "https://money.kompas.com/read/2022/06/21/235826926/cara-membuat-sertifikat-tanah-dilengkapi-syarat-dan-biayanya?page=all#google_vignette",
    "https://www.detik.com/properti/tips-dan-panduan/d-6962844/lengkap-cara-syarat-dan-biaya-bikin-sertifikat-tanah",
    "https://siplawfirm.id/sertifikat-tanah/?lang=id",
    "https://kumparan.com/kabar-harian/cara-mengurus-tanah-yang-belum-bersertifikat-secara-mandiri-di-bpn-20vQHpkZY3d",
    "https://www.ocbc.id/id/article/2023/08/29/cara-membuat-sertifikat-tanah-lewat-notaris",
    "https://www.99.co/id/panduan/cara-membuat-sertifikat-tanah-lewat-notaris/",
    "https://www.medcom.id/properti/tips-properti/0Kv0BpRb-begini-cara-membuat-sertifikat-tanah-di-notaris",
    "https://www.cnnindonesia.com/ekonomi/20211019174222-537-709838/cara-membuat-sertifikat-tanah-lewat-notaris",
    "https://www.insertlive.com/lifestyle/20230913075135-210-318985/biaya-dan-cara-balik-nama-sertifikat-tanah-di-notaris-2023",
    "https://economy.okezone.com/read/2024/02/06/320/2966626/proses-pembuatan-sertifikat-tanah-lewat-notaris",
    "https://ekonomi.bisnis.com/read/20240325/47/1751566/cara-membuat-sertifikat-tanah-online-di-aplikasi-sentuh-tanahku",
    "https://www.detik.com/properti/tips-dan-panduan/d-7189056/tahapan-syarat-dan-proses-pembuatan-sertifikat-tanah-secara-mandiri-dan-ptsl",
    "https://www.atrbpn.go.id/kolom-agraria/detail/1227/cara-mengurus-sertifikat-rumah-yang-hilang-syarat-dan-biayanya",
    "https://www.insertlive.com/lifestyle/20230807133626-210-316211/7-syarat-urus-sertifikat-tanah-secara-gratis",
]

docs = [WebBaseLoader(url).load() for url in urls]
documents = [item for sublist in docs for item in sublist]

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")

text_splitter = RecursiveCharacterTextSplitter(

    chunk_size=2000,
    chunk_overlap=150,

)

chunked_docs = text_splitter.split_documents(documents)

vectordb = Pinecone(
    api_key=os.environ.get("PINECONE_API_KEY")
)

index_name = "landspire"

if index_name not in vectordb.list_indexes().names():
    vectordb.create_index(
        name=index_name,
        dimension=3072,
        metric='cosine',
        spec=ServerlessSpec(
            cloud='aws',
            region='us-east-1'
        )
    )


docsearch = PineconeVectorStore.from_documents(chunked_docs, embeddings, index_name=index_name)

print(docsearch.similarity_search("what is agent memory?", k=3))