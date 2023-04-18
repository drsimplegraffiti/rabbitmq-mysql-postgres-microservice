##### Our test case
We can to be able to create a product and create an order
Should in case the order service is not available, the user service should be able to create an order without the order service
And as soon as the order service is available, the order service should be able to create an order


#### In the order service
> yarn init -y && yarn add pg express

#### In the user service
> yarn init -y && yarn add mysql2 dotenv express bcrypt jsonwebtoken

> docker pull rabbitmq
> docker run -d --name my-rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq
> ui: http://localhost:15672/
> docker run -d --name my-rabbitmq -p 5672:5672 rabbitmq

Username: guest
Password: guest