
** navigate to model
- run: pac auth create --url "your environment"
- run: pac org list
- run: pac org select --environment "your environment"
- run: pac modelbuilder build -o . -stf .\builderSettings.json