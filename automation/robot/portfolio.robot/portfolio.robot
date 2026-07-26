*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}       http://127.0.0.1:5500/Portfolio/index.html
${BROWSER}   Chrome

*** Test Cases ***
Verify Portfolio Homepage
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Title Should Be    Aman Kumar | Software Quality Assurance Engineer
    Capture Page Screenshot
    Close Browser