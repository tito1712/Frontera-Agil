Aquí tienes el texto en formato Markdown, listo para pegar en tu archivo `.md`:

```markdown
## Recuperación de contraseña (pantalla "Olvidé mi clave")

**Explicación:** Se implementó una nueva pantalla de recuperación de contraseña accesible desde el botón "¿Olvidaste tu clave?" en el formulario de Clave Única. El usuario ingresa su correo electrónico y el sistema valida si existe una cuenta asociada, desplegando un mensaje de confirmación de envío si el correo es correcto, o un mensaje de error en línea si no existe registro alguno, todo esto sin recargar la página.

**Justificación:** Durante las pruebas de funcionamiento se detectó que el botón no tenía ninguna acción asociada, dejando incompleto el flujo de autenticación definido en el RF-01. Dado que el ERS contempla explícitamente un plan de contingencia ante credenciales incorrectas, era necesario cubrir este caso para que el prototipo representara fielmente el comportamiento esperado del sistema y pudiera ser evaluado en su totalidad.

## Bloqueo del auto-refresco de Live Server

**Explicación:** Se agregó un script en el archivo HTML principal que intercepta la conexión WebSocket de Live Server y bloquea únicamente las instrucciones de recarga automática. Esto permite que la página permanezca en el estado donde el usuario se encuentra, sin interrupciones, mientras que las recargas manuales mediante F5 o Ctrl+R siguen funcionando con normalidad.

**Justificación:** Al realizar las pruebas de funcionamiento se identificó que Live Server recargaba la página automáticamente cada vez que se guardaba un archivo, devolviendo la aplicación a la pantalla de inicio y perdiendo el estado de los trámites en curso. Esto dificultaba gravemente la demostración y evaluación del prototipo, por lo que se hizo necesario implementar esta corrección para garantizar una experiencia de prueba fluida y continua.

## Formato automático para RUT y DNI extranjero

**Explicación:** Se implementó un formato automático (máscara de entrada) que da estructura al RUT y al DNI extranjero mientras el usuario escribe, por ejemplo, agregando puntos y guion en el caso del RUT (25.020.125-8).

**Justificación:** Reduce errores de tipeo, ya que el formato guía al usuario sobre la estructura esperada del dato. Mejora la legibilidad, tanto para quien lo ingresa como para quien lo revisa después. Y estandariza los datos, lo que facilita su validación y procesamiento dentro del sistema.

## Incorporación de DNI extranjero con contraseña

**Explicación:** Se agregó una vía alternativa de identificación para usuarios que no cuentan con RUT chileno, permitiéndoles ingresar su DNI extranjero junto con una contraseña como método de verificación.

**Justificación:** No todos los usuarios del sistema son ciudadanos o residentes con RUT, puede haber extranjeros en proceso de regularización, turistas u otros casos, por lo que ofrecer esta alternativa amplía el acceso sin excluir a este grupo. La contraseña cumple un rol equivalente al de la clave del RUT (que normalmente se valida contra bases de datos oficiales como el Registro Civil), ya que un DNI extranjero no siempre puede verificarse de la misma manera.

## "Edad" y "Parentesco" como menús desplegables en la verificación de menores

**Explicación:** Los campos "Edad" y "Parentesco" en la sección de verificación de menores se implementaron como menús desplegables, en lugar de campos de texto libre, manteniendo un mismo estilo de componente para ambos.

**Justificación:** Aporta consistencia visual y de interacción, ya que usar el mismo tipo de componente (desplegable) para campos relacionados hace la interfaz más predecible y coherente. También previene errores, al limitar las opciones a valores predefinidos válidos: en el caso de "Edad", un rango acotado (por ejemplo, de 0 a 17 años, dado que se trata de verificar menores), y en el caso de "Parentesco", las relaciones familiares o de tutela reconocidas (Hijo, Hija, Nieto, Nieta, Sobrino, Sobrina, Tutor/a legal, entre otras). Además, agiliza el ingreso de datos, ya que seleccionar de una lista suele ser más rápido y simple que escribir, sobre todo en dispositivos móviles.

## Formulario de registro de cuenta para usuarios extranjeros

**Explicación:** Se incorporó un nuevo formulario de creación de cuenta, orientado a usuarios extranjeros que no poseen RUT chileno. Este formulario solicita los siguientes datos: nombre, primer apellido, segundo apellido (opcional), fecha de nacimiento, país de nacimiento, sexo, correo electrónico (con confirmación) y contraseña (con confirmación, mínimo 8 caracteres). Los campos obligatorios se identifican mediante un asterisco (*), conforme se indica al pie del formulario.

**Justificación:** Este formulario complementa la alternativa de identificación mediante DNI extranjero y contraseña incorporada anteriormente, ya que sin un mecanismo de registro los usuarios extranjeros no tendrían forma de generar las credenciales necesarias para acceder al sistema. La solicitud de datos como país de nacimiento y fecha de nacimiento permite identificar adecuadamente a este tipo de usuarios ante la ausencia de RUT, mientras que la confirmación de correo electrónico y contraseña reduce errores de ingreso. De este modo, el prototipo refleja un flujo de registro completo y coherente para usuarios sin RUT, dando cobertura íntegra al requisito de identificación alternativa contemplado en el ERS.
```

Usé `##` para cada título (nivel de encabezado típico para entradas dentro de un changelog). Si prefieres `###` u otro formato, dime y lo ajusto.
