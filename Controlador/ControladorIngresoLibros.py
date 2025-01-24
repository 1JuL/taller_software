from Utils.Persistencia import guardar_libro, actualizar_libro

class ControladorBiblioteca:
    def agregar_libro(self, libro):
        # Guardar el libro en el archivo de persistencia
        guardar_libro(libro)

        print(f"Libro agregado: {libro.titulo}")  # Mensaje de confirmación en consola
    
    def modificar_libro(self, titulo_original, libro_actualizado):
        # Actualizar el libro en el archivo de persistencia
        actualizar_libro(titulo_original, libro_actualizado)
        print(f"Libro modificado: {libro_actualizado.titulo}")
