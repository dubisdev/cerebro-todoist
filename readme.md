# cerebro-todoist &nbsp; ![npm](https://img.shields.io/npm/v/cerebro-todoist?color=green) ![download number](https://img.shields.io/npm/dt/cerebro-todoist)

> [Cerebro](https://cerebroapp.com) plugin to create and manage Todoist tasks.

⚠️ Cerebro-Todoist is an extension that IS NOT created by, affiliated with, or supported by @Doist

## Installation

- Type `plugins todoist` into Cerebro
- Click `install`
- Set your Todoist API token in the plugin settings --> `plugins todoist` - Select `settings` - `token`

<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/settings_token.png">
</p>

## Usage

### Available commands

- `tds new` ➡️ Creates a new task (natural language syntax supported)
- `tds today` ➡️ Returns a list with tasks for today and overdue tasks
  - Navigate between them to see details
- `tds view` + date ➡️ Returns tasks of that date

😎 You can search between tasks just by typing ➡️ `tds today milk` - Filters the tasks and returns the ones that have "milk" in their name (same with `tds view 12/10 milk`)

💡 You can configure the command names in the plugin settings page ➡️ `plugins todoist settings`

## Related

- [Cerebro](http://github.com/KELiON/cerebro) – main repo for CerebroApp

## Development and Contributions

![Alt](https://repobeats.axiom.co/api/embed/6840a1046d869af4ed1f31cd936af3b7a7e6a192.svg "Repobeats analytics image")

## License

MIT © [Dubisdev](https://dubis.dev)
