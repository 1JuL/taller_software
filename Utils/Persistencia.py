import os
# Ruta del archivo donde se almacenarán los libros
RUTA_ARCHIVO_LIBROS = 'Data/libros.txt'

def guardar_libro(libro):
    # Verificar si la carpeta "Data" existe; si no, crearla
    if not os.path.exists('Data'):
        os.makedirs('Data')
    
    # Guardar los datos del libro en un archivo txt
    with open(RUTA_ARCHIVO_LIBROS, 'a') as file:
        file.write(f"{libro.titulo}|{libro.autor}|{libro.genero}|{libro.fecha}|{libro.portada}\n")

def leer_libros():
    # Leer los libros almacenados en el archivo txt
    try:
        with open(RUTA_ARCHIVO_LIBROS, 'r') as file:
            libros = file.readlines()
        return libros
    except FileNotFoundError:
        return []
    
def actualizar_libro(titulo_original, libro_actualizado):
    libros = leer_libros()
    with open(RUTA_ARCHIVO_LIBROS, 'w') as file:
        for l in libros:
            datos = l.strip().split('|')
            if datos[0] == titulo_original:
                # Reemplazar con los nuevos datos
                file.write(f"{libro_actualizado.titulo}|{libro_actualizado.autor}|{libro_actualizado.genero}|{libro_actualizado.fecha}|{libro_actualizado.portada}\n")
            else:
                file.write(l)