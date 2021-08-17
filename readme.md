# cerebro-todoist &nbsp; ![npm](https://img.shields.io/npm/v/cerebro-todoist?color=green)

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

## Default commands

### ⚙ `new` command

`new` command creates a task in the inbox, with the text you add next. The task date is set to `today` by default.

#### Example

`tds new hello world` generates:

<p align="center">
  <img src="https://github.com/dubisdev/cerebro-todoist/raw/master/readme_files/new_note.png">
</p>

#### Creating tasks with priorities and descriptions

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

### ⚙ `view` command

`tds view dd/mm/yyyy` command shows the tasks you have scheduled for a specific day. Navegate with `tab key` and complete them by pressing `enter key`.

### Why dd/mm/yyyy?

Because this also allows you to quickly search for tasks for the days of the present month by just typing the day number.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8a090ac7-648f-44ee-8aae-0bcb936c3407/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210817%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210817T133821Z&X-Amz-Expires=86400&X-Amz-Signature=1fa4f4ed298f63585b66d482efe82b6c47de9331d8dcf2afbe62a64000f1e171&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/dfb3eeb3-0380-426e-934a-e8181542a549/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210817%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210817T133905Z&X-Amz-Expires=86400&X-Amz-Signature=12eb1ae56e7643ecc7f8e891e4b303bd546694cd1b14c8b0eb66048ad364c1b4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

As you can see, there is no difference between this two images because the plugin recognizes the 28 as "28/08/2021" (08 is the current month when this documentations is being generated).

With the mm/dd/yyyy format this could not happen as the first number is the month not a day.

## Custom Commands

From version v1.1.0 you can customize the commands for different actions from the plugin settings.

<p align="center">
  <img src="https://raw.githubusercontent.com/dubisdev/cerebro-todoist/master/readme_files/custom_commands.png">
</p>

## Related

- [Cerebro](http://github.com/KELiON/cerebro) – main repo for Cerebro app

## License

MIT © [Dubisdev](https://dubis.dev)
