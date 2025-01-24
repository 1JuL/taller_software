class libros:
    def __init__(self, titulo, autor, fecha, genero, id, portada):
        self.titulo=titulo
        self.autor=autor
        self.fecha=fecha
        self.genero=genero
        self.id=id
        self.portada=portada
    
    # Método para convertir un libro a un diccionario (útil para la persistencia)
    def to_dict(self):
        return {
            "id_libro": self.id,
            "titulo": self.titulo,
            "autor": self.autor,
            "genero": self.genero,
            "año": self.fecha,
            "portada": self.portada
        }
