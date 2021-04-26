# EPOLL BY OTTO PISKONEN
This is the epoll web application that I made for Junior Software Developer position.

## USAGE in VSCODE
To run the application use latest VSCODE and command
```
dotnet watch run
```

## PREREQUISITE
Have to have the latest .NET SDK Runtime and VS19 SDK installed to the computer to run.

## PROPERTIES
The Back-end part has Controllers and Models folders and the Front-end files are all inside wwwroot folder. I used .NET EF CORE to implement the REST API back-end. For the front-end I made simple javascript/html/css webpage that called my backend with functions.

## Troubleshooting
If the build fails try running
```
dotnet restore
```
Most of the build errors are because of the SDK version or missing runtime + sdk.
