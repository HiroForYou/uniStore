<p align="center">
    <br>
    <a href="https://github.com/HiroForYou/uniStore">
    <img src="uploads/favicon.svg" width="400"/>
    </a>
    <br>
</p>

<h2 align="center">
<p>Sistema de compras inteligente (uniStore)</p>
</h2>

## Levantar localmente 

### 1. Configurando MongoDB

- MongoDB local
  - Instala mongo desde [aquí](https://www.mongodb.com/try/download/community)
  - Crea un archivo .env en la carpeta raíz
  - Setea MONGODB_URL=mongodb://localhost/unistore
- Atlas Cloud MongoDB
  - Crea una base de datos en [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Crea un archivo .env en la carpeta raíz
  - Setea MONGODB_URL=mongodb+srv://your-db-connection

### 2. Levanta el Backend

```
$ npm install
$ npm start
```

### 3. Levanta el Frontend

```
# abre otro eterminal
$ cd frontend
$ npm install
$ npm start
```

### 4. Crear usuarios y productos

- Ejecute esto en el navegador: http://localhost:5000/api/users/seed
- Devuelve el correo electrónico y la contraseña de administrador
- Ejecute esto en el navegador: http://localhost:5000/api/products/seed
- Crea 6 productos de muestra

### 5. Iniciar sesión como Admin

- En el navegador abre http://localhost:3000/signin
- Ingrese el correo electrónico y la contraseña de administrador y haga clic en iniciar sesión
