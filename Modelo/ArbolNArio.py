class NodoNArio:
    def __init__(self, genero):
        self.genero = genero
        self.libros = []  # Lista de libros que pertenecen a este género
        self.hijos = []  # Subgéneros o libros

class ArbolNArio:
    def __init__(self):
        self.raiz = NodoNArio("Raíz")

    # Método para construir el árbol a partir de una lista de libros
    def construir_arbol(self, lista_libros):
        for libro in lista_libros:
            self.insertar(libro)

    # Método para insertar un libro en el árbol n-ario
    def insertar(self, libro):
        self._insertar_genero(self.raiz, libro.genero, libro)

    def _insertar_genero(self, nodo_actual, genero, libro):
        if nodo_actual.genero == genero:
            nodo_actual.libros.append(libro)
        else:
            for hijo in nodo_actual.hijos:
                if hijo.genero == genero:
                    hijo.libros.append(libro)
                    return
            # Si no se encuentra el género, se crea un nuevo nodo para el género
            nuevo_nodo = NodoNArio(genero)
            nuevo_nodo.libros.append(libro)
            nodo_actual.hijos.append(nuevo_nodo)

    # Método para buscar libros por género
    def buscar_por_genero(self, genero):
        return self._buscar_genero_recursivo(self.raiz, genero.lower())

    def _buscar_genero_recursivo(self, nodo_actual, genero):
        if nodo_actual.genero.lower() == genero:
            return nodo_actual.libros
        for hijo in nodo_actual.hijos:
            resultado = self._buscar_genero_recursivo(hijo, genero)
            if resultado:
                return resultado
        return []
