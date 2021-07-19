# cerebro-todoist v0.1

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

### Creating tasks with priorities and descriptions

You can assign priority property to your tasks using the command `!!`

<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/priority_cerebro.png">
</p>
<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/priority_todoist.png">
</p>

You can assign a description to your tasks using the command `::`\*

<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/description_cerebro.png">
</p>
<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/description1_todoist.png">
</p>
<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/description_todoist.png">
</p>

\*The task priority or name must be before this sign, otherwise it will recognize the text as part of the description

You can combine them as long as you keep in mind that the description must always be the last:

<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/combined_cerebro.png">
</p>
<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/combined1_todoist.png">
</p>
<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/combined_todoist.png">
</p>

### ⚙ `today` command

`today` command shows the tasks you have scheduled for today.
Navegate with `tab key` complete them by pressing `enter key`.

#### Example

Todoist "today" section:

<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/today_todoist.png">
</p>

When you write `tds today`, you get:

<p align="center">
  <img src="https://raw.githubusercontent.com/dubisdev/cerebro-todoist/master/readme_files/today_cerebro.png">
</p>

## Related

- [Cerebro](http://github.com/KELiON/cerebro) – main repo for Cerebro app

## License

MIT © [Dubisdev](https://dubis.dev)
