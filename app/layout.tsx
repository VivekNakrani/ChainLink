"use client"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { polygon, polygonMumbai } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { bindings as wagmiBindings } from "@lens-protocol/wagmi"
import {
	production,
	development,
	LensConfig,
	appId,
	LensProvider,
} from "@lens-protocol/react-web"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import { Mumbai, Polygon } from "@thirdweb-dev/chains"
import { NavbarWithSidebars } from "./components/NavbarWithSidebars"
import { ApplicationBar } from "./components/ApplicationBar"
import "./global.css"

const ENVIRONMENT = process.env.ENVIRONMENT as "development" | "production"

// Wagmi Configure Chains
const chain =
	ENVIRONMENT === "development"
		? polygonMumbai
		: ENVIRONMENT === "production"
		? polygon
		: polygonMumbai

// Lens Config Environment
const environment =
	ENVIRONMENT === "development"
		? development
		: ENVIRONMENT === "production"
		? production
		: development

const { provider, webSocketProvider } = configureChains(
	[chain],
	[publicProvider()]
)

const wagmiClient = createClient({
	autoConnect: true,
	provider,
	webSocketProvider,
})

const lensConfig: LensConfig = {
	bindings: wagmiBindings(),
	environment,
	appId: appId("metro-house"),
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<ThirdwebProvider activeChain={Polygon}>
				<WagmiConfig client={wagmiClient}>
					<LensProvider config={lensConfig}>
						{/* <GlobalContextProvider> */}
						<body>
							<NavbarWithSidebars>
								{children}
								<ApplicationBar />
							</NavbarWithSidebars>
						</body>
						{/* </GlobalContextProvider> */}
					</LensProvider>
				</WagmiConfig>
			</ThirdwebProvider>
		</html>
	)
}
