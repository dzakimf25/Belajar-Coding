const main = async () => {
    const LandspireFactory = await hre.ethers.getContractFactory(
      'KoinLandNfts',
    )

    const LandspireContract = await LandspireFactory.deploy()
  
    await LandspireContract.waitForDeployment()
  
    console.log('Certificate Minter deployed to:', await LandspireContract.getAddress())
  }
  
  ;(async () => {
    try {
      await main()
      process.exit(0)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  })()