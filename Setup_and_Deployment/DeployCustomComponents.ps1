Remove-Item 'CustomComponents' -Recurse
mkdir CustomComponents
cd CustomComponents
pac solution init --publisher-name Ulriken --publisher-prefix uc 
pac solution add-reference --path '..\..\CustomComponents\LinearInputControl'
pac solution add-reference --path '..\..\CustomComponents\CalendarComponent'
pac solution version --buildversion 1
msbuild /t:restore 
dotnet build
pac auth create --environment https://org70c66a0d.crm4.dynamics.com
pac auth list 
pac solution import --path 'bin\debug\CustomComponents.zip'