class NodoAVL:
    def __init__(self, año, libro):
        self.año = año
        self.libros = [libro]  # Lista de libros de ese año
        self.altura = 1
        self.izquierda = None
        self.derecha = None

class ArbolAVL:
    def __init__(self):
        self.raiz = None

    # Método para construir el árbol desde una lista de libros
    def construir_arbol(self, lista_libros):
        for libro in lista_libros:
            self.insertar(libro)

    def insertar(self, libro):
        self.raiz = self._insertar_recursivo(self.raiz, libro)
        
    def _insertar_recursivo(self, nodo, libro):
        # Inserción en el árbol AVL
        if nodo is None:
            return NodoAVL(libro.fecha, libro)
        
        if libro.fecha < nodo.año:
            nodo.izquierda = self._insertar_recursivo(nodo.izquierda, libro)
        elif libro.fecha > nodo.año:
            nodo.derecha = self._insertar_recursivo(nodo.derecha, libro)
        else:  # Mismo año, agregar a la lista de libros
            nodo.libros.append(libro)
            return nodo

        # Ajustar alturas y realizar balanceo si es necesario (simplificado)
        nodo.altura = 1 + max(self._obtener_altura(nodo.izquierda), self._obtener_altura(nodo.derecha))
        print(self.raiz)
        return nodo  # En una implementación completa, aquí vendría el balanceo

    def _obtener_altura(self, nodo):
        if nodo is None:
            return 0
        return nodo.altura

    # Método para buscar libros por año
    def buscar(self, año):
        return self._buscar_recursivo(self.raiz, año)

    def _buscar_recursivo(self, nodo, año):
        if nodo is None:
            return []
        if año < nodo.año:
            return self._buscar_recursivo(nodo.izquierda, año)
        elif año > nodo.año:
            return self._buscar_recursivo(nodo.derecha, año)
        else:
            return nodo.libros
