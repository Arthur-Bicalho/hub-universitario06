@ECHO OFF
SETLOCAL
SET "MAVEN_VERSION=3.9.11"
SET "MAVEN_HOME_DIR=%USERPROFILE%\.m2\wrapper\dists\apache-maven-%MAVEN_VERSION%"
SET "MAVEN_BIN=%MAVEN_HOME_DIR%\apache-maven-%MAVEN_VERSION%\bin\mvn.cmd"
IF NOT EXIST "%MAVEN_BIN%" (
  IF NOT EXIST "%MAVEN_HOME_DIR%" MKDIR "%MAVEN_HOME_DIR%"
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$url='https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/%MAVEN_VERSION%/apache-maven-%MAVEN_VERSION%-bin.zip'; $zip='%MAVEN_HOME_DIR%\maven.zip'; Invoke-WebRequest -Uri $url -OutFile $zip; Expand-Archive -Path $zip -DestinationPath '%MAVEN_HOME_DIR%' -Force; Remove-Item $zip"
)
CALL "%MAVEN_BIN%" -f "%~dp0pom.xml" %*
ENDLOCAL
