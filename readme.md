# cerebro-todoist

> [Cerebro](https://cerebroapp.com) plugin to create and manage todoist.

## Installation

- Type `plugins todoist` into Cerebro
- Click `install`
- Set your Todoist API token in the plugin settings --> `plugins todoist` - Select `settings` - `token`

<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/settings_token.png">
</p>

## Usage

In Cerebro, type `tds` and then one of the [available commands](#available-commands).

## Available commands

### ⚙ `new` command

`new` command creates a task in the inbox, with the text you add next. The task date is set to `today` by default.

#### Example

`tds new hello world` generates:

<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/new_note.png">
</p>

### ⚙ `today` command

`today` command shows the tasks you have scheduled for today.

#### Example

Todoist "today" section:

<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/today_todoist.png">
</p>

When you write `tds today`, you will get:

<p align="center">
  <img src="https://raw.githubusercontent.com/dubisdev/cerebro-todoist/master/readme_files/new_note.png">
</p>

## Related

- [Cerebro](http://github.com/KELiON/cerebro) – main repo for Cerebro app

## License

MIT © [Dubisdev](https://dubis.dev)
