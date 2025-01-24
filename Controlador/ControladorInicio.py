from Modelo.ArbolBinario import ArbolBinario
from Modelo.ArbolNArio import ArbolNArio
from Modelo.ArbolBalanceado import ArbolAVL
from Modelo.Libros import libros as Libro
from Utils.Persistencia import guardar_libro, leer_libros


class ControladorInicio:
    def __init__(self):
        self.cargar_libros()

    def cargar_libros(self):
        # Inicializar los diferentes tipos de árboles
        self.arbol_binario_titulo = ArbolBinario()
        self.arbol_n_ario_genero = ArbolNArio()
        self.arbol_balanceado_fecha = ArbolAVL()

        # Cargar los libros desde la persistencia
        self.libros = leer_libros()
        for linea in self.libros:
            try:
                titulo, autor, genero, fecha, portada = linea.strip().split('|')
                libro = Libro(titulo, autor, int(fecha), genero, id=0, portada=portada)
                self.agregar_libro_a_estructuras(libro)
            except ValueError:
                print(f"Error al cargar el libro desde la línea: {linea}")

    def agregar_libro(self, libro):
        # Insertar el libro en las estructuras de árboles
        self.agregar_libro_a_estructuras(libro)

        # Guardar el libro en el archivo de persistencia
        guardar_libro(libro)

    def agregar_libro_a_estructuras(self, libro):
        # Insertar en el árbol binario por título
        self.arbol_binario_titulo.insertar(libro)
        # Insertar en el árbol N-Ario por género
        self.arbol_n_ario_genero.insertar(libro)
        # Insertar en el árbol balanceado por año
        self.arbol_balanceado_fecha.insertar(libro)

    def buscar_por_titulo(self, titulo):
        # Utilizar el árbol binario para buscar por título
        return self.arbol_binario_titulo.buscar(titulo)

    def buscar_por_genero(self, genero):
        # Utilizar el árbol N-Ario para buscar por género
        return self.arbol_n_ario_genero.buscar_por_genero(genero)

    def buscar_por_fecha(self, fecha):
        # Utilizar el árbol balanceado para buscar por año
        return self.arbol_balanceado_fecha.buscar(fecha)

    def obtener_todos_los_libros(self):
        # Devolver todos los libros leídos del archivo
        self.cargar_libros()
        return self.libros

    def buscar_libros(self, titulo=None, genero=None, fecha=None):
        resultados = set()

        if titulo:
            resultado_titulo = self.buscar_por_titulo(titulo)
            if resultado_titulo:
                resultados.add(resultado_titulo)

        if genero:
            resultados_genero = self.buscar_por_genero(genero)
            if resultados_genero:
                resultados.update(resultados_genero)

        if fecha:
            resultados_fecha = self.buscar_por_fecha(fecha)
            if resultados_fecha:
                resultados.update(resultados_fecha)

        return list(resultados)

    def buscar_libros_avanzado(self, autor=None, genero=None, fecha=None):
        libros = []
        for linea in leer_libros():
            datos = linea.strip().split('|')
            if len(datos) < 5:
                continue
            t, a, g, f, p = datos
            coincide = True
            if autor and autor.lower() not in a.lower():
                coincide = False
            if genero and genero.lower() not in g.lower():
                coincide = False
            if fecha and fecha != int(f):
                coincide = False
            if coincide:
                libro = Libro(t, a, int(f), g, id=0, portada=p)
                libros.append(libro)
        return libros

