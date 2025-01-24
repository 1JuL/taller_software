class NodoLibro:
    def __init__(self, libro):
        self.libro = libro
        self.izquierda=None
        self.derecha=None

class  ArbolBinario:
    def __init__(self):
        self.raiz = None
    
    def construir_arbol(self, lista_libros):
        for libro in lista_libros:
            self.insertar(libro)
    
    def insertar(self, libro):
        if not self.raiz:
            self.raiz = NodoLibro(libro)
        else:
            self._insertar_recursivo(self.raiz, libro)
    
    def _insertar_recursivo(self, nodo_actual, libro):
        if libro.titulo.lower() < nodo_actual.libro.titulo.lower():
            if nodo_actual.izquierda is None:
                nodo_actual.izquierda = NodoLibro(libro)
            else:
                self._insertar_recursivo(nodo_actual.izquierda, libro)
        else:
            if nodo_actual.derecha is None:
                nodo_actual.derecha = NodoLibro(libro)
            else:
                self._insertar_recursivo(nodo_actual.derecha, libro)
    
    def buscar(self, titulo):
        return self._buscar_recursivo(self.raiz, titulo.lower())

    def _buscar_recursivo(self, nodo_actual, titulo):
        if nodo_actual is None:
            return None
        if nodo_actual.libro.titulo.lower() == titulo:
            return nodo_actual.libro
        elif titulo < nodo_actual.libro.titulo.lower():
            return self._buscar_recursivo(nodo_actual.izquierda, titulo)
        else:
            return self._buscar_recursivo(nodo_actual.derecha, titulo)


