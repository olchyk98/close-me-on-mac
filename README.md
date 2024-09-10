# Close Me on Mac 🖥️

## Purpose


## Implementation
@inquirer/prompts

## Inspiration for this project
I am a person of multi-tasking. Whenever I am heavily invested in to doing something on my Mac,
I can have many applications opened depending on how I feel. Sometimes I write Code, text
people on Slack, Messages and WhatsUp, compose music and edit videos - all at the same time!

After a long day of work, it becomes harder for me to find applications that I need right
away on my apps dock (bottom bar where running applications are displayed). Closing unused
applications manually has become a tidious process, especially when my entire apps dock is
bloated with a huge amount of running apps.

For this reason I decided to implement this small utility which would allow me to quickly
see all the running applications, search for those I would like (or select all) and close
them all together. So much faster!

## Credits

Written by Oles Odynets as a personal tool.
Feel free to submit a Pull Request if you come up with an interesting feature for this tool! ❤️

## The only MacOS read payload used in this project
```
osascript -e 'tell application "System Events" to set output to ""' -e 'tell application "System Events" to repeat with proc in (processes where background only is false)' -e 'set output to output & name of proc & " (" & unix id of proc & ")" & linefeed' -e 'end repeat' -e 'return output'
```
