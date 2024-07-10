# porter-base

The base plugin contains:

* RDB Schema definition and the meta description for DB entities.
* Common code (enumerations, utilities, interfaces).
* Backend actions for low-level data processing (CRUD operations with RDB.

## Tech Stack

* Frontend: HTML5, CSS3, JS (ES + JSDoc), Vue 3, VueRouter, Quasar v2, i18next;
* Backend: nodejs (ES + JSDoc), npm, Knexjs, PostgreSQL

## Init the RDB

```shell
$ sudo apt install postgresql postgresql-contrib
$ sudo -i -u postgres
$ createuser --interactive
Enter name of role to add: porter
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) n
Shall the new role be allowed to create more new roles? (y/n) n
$ createdb porter
$ psql
grant all privileges on database porter to porter;
alter role porter with password '...';
\c porter
GRANT ALL PRIVILEGES ON SCHEMA public TO porter;
\q
```

To create RDB scheme set up the connection in the `./cfg/local.json`:

```json
{
  "@teqfw/db": {
    "client": "pg",
    "connection": {
      "database": "porter",
      "host": "127.0.0.1",
      "password": "...",
      "user": "porter"
    }
  }
}
```

then run the command:

```
$ npm run db-init
```

Expected output:

```
07/10 12:28:44.857 (info TeqFw_Core_Back_App): Starting teq-app '@ranncow/porter-desk:0.1.0'...
...
07/10 12:28:45.436 (info TeqFw_Db_Back_Cli_Init): Database structure is recreated.
07/10 12:28:45.437 (info TeqFw_Core_Back_App): Stopping the teq-plugins for '@ranncow/porter-desk:0.1.0'...
07/10 12:28:45.440 (info TeqFw_Core_Back_App_A_Stop_Plugins): Stopping the '@teqfw/db' plugin...
07/10 12:28:45.553 (info TeqFw_Db_Back_RDb_IConnect): Connections to 'porter@127.0.0.1' as 'porter' are closed.
07/10 12:28:45.553 (info TeqFw_Core_Back_App): The teq-app '@ranncow/porter-desk:0.1.0' has been stopped.
```

## Links

* https://cust.pilot.porter.wiredgeese.com/
* https://desk.pilot.porter.wiredgeese.com/
* https://miro.com/app/board/uXjVKMV3qyk=/