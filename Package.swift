// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "FitnessApp",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "FitnessApp",
            targets: ["FitnessApp"]),
    ],
    targets: [
        .target(
            name: "FitnessApp",
            path: "."),
    ]
)
