<h1 align="center">
  Documentation
</h1>

<p align="center">
  <a href="#types">Types</a>
  •
  <a href="#parameter-categories">Parameter categories</a>
  •
  <a href="#detailed-commands-description">Detailed commands description</a>
</p>

Types
----------

* **Moderation**: [`ban`](#ban), [`kick`](#kick), [`mute`](#mute), [`unmute`](#unmute)

  *commands for moderation*

* **Builder**: [`create`](#create), [`delete`](#delete), [`logoff`](#logoff), [`logon`](#logon)

  *commands for creation/deletion*

* **Information**: [`bot prefix`](#bot-prefix), [`hello`](#hello), [`help`](#help), [`ping`](#ping), [`prefix`](#prefix), [`logon`](#logon)

  *commands for informing*
  
* **Set**: [`logoff`](#logoff), [`logon`](#logon), [`mute`](#mute), [`prefix`](#prefix), [`set default prefix`](#set-default-prefix)

  *commands for changing the state*

* **Prefixless**: [`bot prefix`](#bot-prefix), [`set default prefix`](#set-default-prefix)

  *commands that don't need a prefix to use*

Parameter categories
--------------------

| Parameter        | Description         | Example                 |
|------------------|---------------------|-------------------------|
| square brackets  | Optional parameter  | [value]                 |
| arrow brackets   | Required parameter  | <<y>value>              |
| double ampersand | Combined parameter  | value: value1 && value2 |

Detailed commands description
--------------------

### Ban

* **Description**: ban the specified member
* **type**: Moderation
* **Access**: ADMINISTRATOR
* **Usage**: `-ban <member> [reason]`

### Bot prefix

* **Description**: get current bot prefix
* **type**: Prefixless, Information
* **Access**: ALL
* **Usage**: `bot prefix`

### Create

* **Description**: create a new text/voice channel
* **type**: Builder
* **Access**: ADMINISTRATOR
* **Usage**: `-create <name> <type>`

### Delete

* **Description**: deleting specified or current channel
* **type**: Builder
* **Access**: ADMINISTRATOR
* **Usage**: `-delete <name>`

### Hello

* **Description**: send a greeting reply to you
* **type**: Information
* **Access**: ALL
* **Usage**: `-hello`

### Help

* **Description**: show info about bot commands
* **type**: Information
* **Access**: ALL
* **Usage**: `-help`

### Kick

* **Description**: kick a specific user
* **type**: Moderation
* **Access**: ADMINISTRATOR
* **Usage**: `-kick <member> [reason]`

### Logoff

* **Description**: disables logging on the server
* **type**: Builder, Set
* **Access**: ADMINISTRATOR
* **Usage**: `-logoff`

### Logon

* **Description**: enables logging on the server
* **type**: Builder, Set, Information
* **Access**: ADMINISTRATOR
* **Usage**: `-logon`

### Mute

* **Description**: mute a specific user for a certain time
* **type**: Moderation, Set
* **Access**: ADMINISTRATOR
* **Usage**: `-mute <member> <time: number && type> [reason]`

### Ping

* **Description**: check the bot's response
* **type**: Information
* **Access**: ALL
* **Usage**: `-ping`

### Prefix

* **Description**: show current prefix and changes it
* **type**: Information, Set
* **Access**: ALL, ADMINISTRATOR
* **Usage**: `-prefix [new-prefix]`


### Set default prefix

* **Description**: set current prefix to default ( - )
* **type**: Prefixless, Set
* **Access**: ADMINISTRATOR
* **Usage**: `set default prefix`

### Unmute

* **Description**: unmute a specific user
* **type**: Moderation
* **Access**: ADMINISTRATOR
* **Usage**: `-unmute <member>`
