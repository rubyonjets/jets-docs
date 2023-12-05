---
title: DynamoDB Dynomite Single Table Inheritance
nav_text: STI
category: dynamodb-associations
order: 6
---

Dynamoid supports STI, Single Table Inheritance. You can enable it like so:

```ruby
class Vehicle < ApplicationItem
  enable_sti
end
```

```ruby
class Bike < Vehicle
end
```

```ruby
class Car < Vehicle
end
```

The table name of the subclasses `Bike` and `Car` is same as the `Vehicle` class.

```ruby
Vehicle.table_name  # demo-dev_vehicles
Bike.table_name     # demo-dev_vehicles
Car.table_name      # demo-dev_vehicles
```

The default inheritance field is `type` and the class name is saved into that field.

```ruby
Bike.create(color: "blue")
Car.create(color: "blue")
Bike.where(color: "blue").count    # 1
Car.where(color: "blue").count     # 1
Vehicle.where(color: "blue").count # 2
```

Querying is automatically scoped to the `type` field.

```ruby
Car.where(color: "blue").count                  # 1
Vehicle.where(color: "blue", type: "Car").count # 1
```

## Inheritance Field

You can change the inheritance field to use by passing it as a argument.

```ruby
class Vehicle < ApplicationItem
  enable_sti :kind
end
```

Note: `enable_sti` and `inheritance_field` are aliases. So this also works:

```ruby
class Vehicle < ApplicationItem
  inheritance_field :kind
end
```

## Multiple Levels of Subclasses

Subclasses at additional levels will still be stored in the same type.

```ruby
class ElectricCar < Car
end
```

```ruby
ElectricCar.table_name  # demo-dev_vehicles
```

The table name is the first non-abstract class. If you need to make a base class that's a subclass of `ApplicationItem` abstract, you can call the `abstract!` method.

## Related

Related Rails ActiveRecord Docs:

* [Associations Single Table Inheritance](https://guides.rubyonrails.org/association_basics.html#single-table-inheritance-sti)
* [Single table inheritance Reference](https://api.rubyonrails.org/classes/ActiveRecord/Inheritance.html)
