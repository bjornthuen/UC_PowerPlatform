mkdir CustomComponents
cd CustomComponents
pac solution init --publisher-name Ulriken Consulting --publisher-prefix uc 
pac solution add-reference --path ..\..\CustomComponents\LinearInputControl
pac solution add-reference --path ..\..\CustomComponents\CalendarComponent
pac auth create --url https://org70c66a0d.crm4.dynamics.com
pac auth list 