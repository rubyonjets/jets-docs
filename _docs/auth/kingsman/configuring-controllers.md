---
title: "Kingsman: Configuring Controllers"
nav_text: Controllers
category: kingsman
order: 6
---

If the customization at the views level is not enough, you can customize each controller by following these steps:

1. Create your custom controllers using the generator which requires a scope:

        jets generate kingsman:controllers [scope]

    If you specify `users` as the scope, controllers will be created in `app/controllers/users/`.
    And the sessions controller will look like this:

    ```ruby
    class Users::SessionsController < Kingsman::SessionsController
      # GET /resource/sign_in
      # def new
      #   super
      # end
      ...
    end
    ```
    Use the `-c` flag to specify one or more controllers, for example: `jets generate kingsman:controllers users -c sessions`)

2. Tell the router to use this controller:

    ```ruby
    kingsman_for :users, controllers: { sessions: 'users/sessions' }
    ```

3. Recommended but not required: copy (or move) the views from `kingsman/sessions` to `users/sessions`. Jets will continue using the views from `kingsman/sessions` due to inheritance if you skip this step, but having the views matching the controller(s) keeps things consistent.

4. Finally, change or extend the desired controller actions.

    You can completely override a controller action:

    ```ruby
    class Users::SessionsController < Kingsman::SessionsController
      def create
        # custom sign-in code
      end
    end
    ```

    Or you can simply add new behavior to it:

    ```ruby
    class Users::SessionsController < Kingsman::SessionsController
      def create
        super do |resource|
          BackgroundWorker.trigger(resource)
        end
      end
    end
    ```

    This is useful for triggering background jobs or logging events during certain actions.

Remember that Kingsman uses flash messages to let users know if sign in was successful or unsuccessful. Kingsman expects your application to call `flash[:notice]` and `flash[:alert]` as appropriate. Do not print the entire flash hash, print only specific keys. In some circumstances, Kingsman adds a `:timedout` key to the flash hash, which is not meant for display. Remove this key from the hash if you intend to print the entire hash.