# Principal  
1. Inicio.
2. Pagina de inicio.
3. Personas <- [].
4. Llamar procedimiento "Personas".
5. Desplegar, Personas.
6. Localizaciones <- [], Actividades <- [].
7. Desplegar "Decida persona", Persona <- "".
8. Desplegar "Desea actividades?", Actividad <- bool
9. Desplegar "Desea localizaciones?", Localizacion <- bool
10. Llamar procedimiento "Informacion".
11. Desplegar Localizaciones, Actividades.
12. Si salir = true, paso 13. Sino, paso 7.
13. Fin.

# Base de datos  
Personas
1. Inicio.
2. Personas <- [].
3. Extraer, Personas.
4. Retornar, Personas.
5. Fin.

Informacion
1. Inicio.
2. Persona <- "", Localizacion <- bool, Actividad <- bool.
3. Localizaciones <- [], Actividades <- [].
4. Extraer, Localizaciones, Actividades.
5. Si Localizacion = true && Actividad = true, paso 6. Sino, paso 8.
6. Regresar Localizaciones, Actividades.
7. Paso 14.
8. Si Localizacion = true && Actividad = false, paso 9. Sino, paso 11.
9. Regresar Localizaciones.
10. Paso 14.
11. Si Localizacion = false && Actividad = true, paso 12. Sino, paso 14.
12. Regresar Actividades.
13. Paso 14.
14. Fin.
