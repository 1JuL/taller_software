import tkinter as tk
from tkinter import *
from tkinter import messagebox
from PIL import Image, ImageTk
from Vistas.IngresarLibros import InterfazIngresoLibros
from Controlador.ControladorIngresoLibros import ControladorBiblioteca
from Controlador.ControladorInicio import ControladorInicio
from Utils.Persistencia import leer_libros, RUTA_ARCHIVO_LIBROS
import os
import networkx as nx
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

class InterfazInicio:
    def __init__(self, root):
        # Inicialización
        self.root = root
        self.root.title("Gestión de biblioteca")
        self.root.geometry("750x620")
        self.centrar_ventana(self.root, 750, 620)

        # Crear una instancia del controlador
        self.controlador = ControladorInicio()

        # Etiquetas y campos de entrada para la búsqueda por título, género y fecha
        label1 = Label(root, text="Buscar por título", bg="lightblue", width=30)
        label1.grid(row=0, column=0, padx=10, pady=10)

        self.txt_titulo = Entry(root, width=30)
        self.txt_titulo.grid(row=1, column=0, padx=10, pady=5)

        label2 = Label(root, text="Buscar por género", bg="lightgreen", width=30)
        label2.grid(row=0, column=1, padx=10, pady=10)

        self.txt_genero = Entry(root, width=30)
        self.txt_genero.grid(row=1, column=1, padx=10, pady=5)

        label3 = Label(root, text="Buscar por fecha", bg="lightcoral", width=30)
        label3.grid(row=0, column=2, padx=10, pady=10)

        self.txt_fecha = Entry(root, width=30)
        self.txt_fecha.grid(row=1, column=2, padx=10, pady=5)

        BotonBuscar = Button(root, text="Buscar", command=self.buscar_libros)
        BotonBuscar.grid(row=3, column=1, pady=5)

        BotonRefrescar = Button(root, text="Refrescar página", command=self.mostrar_libros)
        BotonRefrescar.grid(row=3, column=2, pady=5)

        # Configuración del Canvas y Scrollbar
        self.canvas = Canvas(root, width=650, height=450)
        self.canvas.grid(row=4, rowspan=5, column=0, columnspan=3, pady=10, sticky="nsew")

        # Agregar Scrollbar al Canvas
        self.scrollbar = Scrollbar(root, orient="vertical", command=self.canvas.yview)
        self.scrollbar.grid(row=4, column=3, rowspan=5, sticky="ns")

        self.canvas.configure(yscrollcommand=self.scrollbar.set)

        # Crear el frame dentro del Canvas para los libros
        self.frame = Frame(self.canvas, bg="green")
        self.canvas_window = self.canvas.create_window((0, 0), window=self.frame, anchor="nw")

        # Configurar el canvas para expandir el scroll con los elementos
        self.frame.bind("<Configure>", lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all")))

        # Ajustar el tamaño del canvas y del frame al redimensionar la ventana
        root.grid_rowconfigure(4, weight=1)
        root.grid_columnconfigure(0, weight=1)
        root.grid_columnconfigure(1, weight=1)
        root.grid_columnconfigure(2, weight=1)

        self.canvas.bind("<Configure>", self._on_canvas_resize)

        # Vincular la rueda del ratón para hacer scroll
        self.canvas.bind_all("<MouseWheel>", self._on_mouse_wheel)

        # Botón Añadir Libro
        BotonAñadir = Button(root, text="Añadir libro", command=self.abrir_ventana_ingresar_libro)
        BotonAñadir.grid(row=9, column=0, padx=10, pady=5)

        # Botón Ver Grafo
        BotonGrafos = Button(root, text="Ver grafo", command=self.abrir_ventana_grafo)
        BotonGrafos.grid(row=9, column=2, padx=10, pady=5)

        # Mantener referencias a imágenes
        self.imagenes_cargadas = []

        # Mostrar los libros al iniciar la aplicación
        self.mostrar_libros()

    def centrar_ventana(self, ventana, ancho, alto):
        # Centramos la ventana recibida en la pantalla
        pantalla_ancho = ventana.winfo_screenwidth()
        pantalla_alto = ventana.winfo_screenheight()
        x = int((pantalla_ancho / 2) - (ancho / 2))
        y = int((pantalla_alto / 2) - (alto / 2))
        ventana.geometry(f"{ancho}x{alto}+{x}+{y}")

    def _on_canvas_resize(self, event):
        # Ajustar el tamaño del frame dentro del Canvas cuando el Canvas se redimensiona
        canvas_width = event.width
        self.canvas.itemconfig(self.canvas_window, width=canvas_width)

    def _on_mouse_wheel(self, event):
        # Manejar el evento de la rueda del ratón para hacer scroll en el canvas
        self.canvas.yview_scroll(-1 * (event.delta // 120), "units")

    def abrir_ventana_ingresar_libro(self, libro_modificar=None):
        # Crear una nueva ventana secundaria
        nueva_ventana = Toplevel(self.root)
        if libro_modificar:
            nueva_ventana.title("Modificar Libro")
        else:
            nueva_ventana.title("Ingreso de Libros")

        # Centramos la nueva ventana
        self.centrar_ventana(nueva_ventana, 400, 300)

        # Crear una instancia del controlador
        controlador = ControladorBiblioteca()

        # Crear una instancia de la interfaz de ingreso de libros en la nueva ventana
        InterfazIngresoLibros(nueva_ventana, controlador, self.mostrar_libros, libro_modificar)

    def abrir_ventana_grafo(self):
        # Crear una nueva ventana para ingresar criterios del grafo
        nueva_ventana = Toplevel(self.root)
        nueva_ventana.title("Generar Grafo")
        nueva_ventana.geometry("400x300")

        # Centramos la nueva ventana
        self.centrar_ventana(nueva_ventana, 400, 300)

        # Etiquetas y campos de entrada para los criterios
        Label(nueva_ventana, text="Autor:").grid(row=1, column=0, padx=10, pady=5)
        entry_autor = Entry(nueva_ventana, width=30)
        entry_autor.grid(row=1, column=1, padx=10, pady=5)

        Label(nueva_ventana, text="Género:").grid(row=2, column=0, padx=10, pady=5)
        entry_genero = Entry(nueva_ventana, width=30)
        entry_genero.grid(row=2, column=1, padx=10, pady=5)

        Label(nueva_ventana, text="Año:").grid(row=3, column=0, padx=10, pady=5)
        entry_año = Entry(nueva_ventana, width=30)
        entry_año.grid(row=3, column=1, padx=10, pady=5)

        # Botón para generar el grafo
        Button(nueva_ventana, text="Generar Grafo", command=lambda: self.generar_grafo(
            entry_autor.get(),
            entry_genero.get(),
            entry_año.get(),
            nueva_ventana
        )).grid(row=4, column=1, pady=10)

    def buscar_libros(self):
        # Obtener los valores de los campos de búsqueda
        titulo = self.txt_titulo.get().strip()
        genero = self.txt_genero.get().strip()
        fecha = self.txt_fecha.get().strip()

        # Convertir año a entero si es posible
        if fecha and fecha.isdigit():
            fecha = int(fecha)
        else:
            fecha = None

        # Buscar los libros utilizando el controlador y las estructuras de árboles
        resultados = self.controlador.buscar_libros(titulo=titulo, genero=genero, fecha=fecha)

        # Mostrar los libros encontrados
        self.mostrar_libros(resultados)

    def mostrar_libros(self, libros=None):
        # Limpiar el frame antes de mostrar los libros
        for widget in self.frame.winfo_children():
            widget.destroy()

        # Si no se especifica, obtener todos los libros
        if libros is None:
            libros = self.controlador.obtener_todos_los_libros()

        # Mostrar cada libro en un mini frame dentro del frame principal
        for index, libro in enumerate(libros):
            # Si el libro es una línea desde el archivo de texto, procesar la línea
            if isinstance(libro, str):
                try:
                    titulo, autor, genero, fecha, portada = libro.strip().split('|')
                except ValueError as e:
                    messagebox.showerror("Error", f"Error en el formato del libro: {str(e)}")
                    continue
            else:
                # Si el libro es un objeto, extraer los atributos
                titulo = libro.titulo
                autor = libro.autor
                genero = libro.genero
                fecha = libro.fecha
                portada = libro.portada

            # Crear un mini frame para el libro
            mini_frame = Frame(self.frame, bg="white", relief="raised", bd=2, width=630, height=150)
            mini_frame.pack(padx=10, pady=10, fill='x')

            # Mostrar la portada del libro
            try:
                if os.path.exists(portada):  # Verificar si la ruta de la portada es válida
                    img = Image.open(portada)
                    img = img.resize((100, 120), Image.LANCZOS)
                    img = ImageTk.PhotoImage(img)
                    label_img = Label(mini_frame, image=img)
                    label_img.image = img  # Mantener una referencia a la imagen para evitar que sea eliminada por el recolector de basura
                    label_img.grid(row=0, column=0, padx=10, pady=10)
                    self.imagenes_cargadas.append(img)
                else:
                    raise FileNotFoundError(f"La portada '{portada}' no se pudo encontrar.")
            except Exception as e:
                label_img = Label(mini_frame, text=f"Portada no encontrada\n{str(e)}", bg="grey", width=15, height=8)
                label_img.grid(row=0, column=0, padx=10, pady=10)

            # Mostrar el título, autor, género y año del libro dentro del mini frame
            label_info = Label(mini_frame, text=f"Título: {titulo}\nAutor: {autor}\nGénero: {genero}\nAño: {fecha}",
                        anchor="w", justify="left", bg="white")
            label_info.grid(row=0, column=1, padx=10, pady=10)
            BotonModificar=Button(mini_frame, text="Modificar", command=lambda l={
                                        'titulo': titulo,
                                        'autor': autor,
                                        'genero': genero,
                                        'fecha': fecha,
                                        'portada': portada}: self.abrir_ventana_ingresar_libro(l))
            BotonModificar.grid(row=1, column=1, padx=10, pady=10)

            # Botón Eliminar
            BotonEliminar = Button(mini_frame, text="Eliminar", command=lambda t=titulo: self.eliminar_libro(t))
            BotonEliminar.grid(row=1, column=2, padx=10, pady=10)

    def eliminar_libro(self, titulo):
        # Confirmar la eliminación
        respuesta = messagebox.askyesno("Confirmar", f"¿Estás seguro de que deseas eliminar '{titulo}'?")
        if respuesta:
            # Filtrar los libros que no tengan el título a eliminar
            libros = leer_libros()
            with open(RUTA_ARCHIVO_LIBROS, 'w') as file:
                for l in libros:
                    datos = l.strip().split('|')
                    if datos[0] != titulo:
                        file.write(l)
            messagebox.showinfo("Éxito", f"El libro '{titulo}' ha sido eliminado.")
            self.mostrar_libros()
    
    def generar_grafo(self, autor, genero, año, ventana):
        # Convertir año a entero si es posible
        if año and año.isdigit():
            año = int(año)
        else:
            año = None

        # Obtener los libros que coincidan con los criterios
        libros = self.controlador.buscar_libros_avanzado(autor=autor, genero=genero, fecha=año)

        if not libros:
            messagebox.showinfo("Sin resultados", "No se encontraron libros con esos criterios.")
            return
        
        # Determinar los criterios proporcionados
        criterios = []
        if autor:
            criterios.append('autor')
        if genero:
            criterios.append('genero')
        if año:
            criterios.append('año')
        if not criterios:
            messagebox.showinfo("Sin criterios", "No se han ingresado criterios para generar el grafo.")
            return
        # Crear y mostrar el grafo
        self.mostrar_grafo(libros, criterios)
        ventana.destroy()  # Cerrar la ventana de criterios
    
    def mostrar_grafo(self, libros, criterios):
        # Crear el grafo
        G = nx.Graph()

        # Crear conjuntos para almacenar los valores únicos de cada criterio
        autores = set()
        generos = set()
        años = set()
        libros_nodos = []

        # Añadir nodos y aristas al grafo según los criterios proporcionados
        for libro in libros:
            if 'autor' in criterios and libro.autor:
                autores.add(libro.autor)
            if 'genero' in criterios and libro.genero:
                generos.add(libro.genero)
            if 'año' in criterios and libro.fecha:
                años.add(libro.fecha)
        
            # Crear un nodo para el libro y agregar al grafo
            libro_nodo = f"Libro: {libro.titulo}"
            libros_nodos.append(libro_nodo)
            G.add_node(libro_nodo, tipo='libro')

            # Conectar el libro con los criterios aplicables
            if 'autor' in criterios and libro.autor:
                G.add_edge(libro_nodo, libro.autor)
            if 'genero' in criterios and libro.genero:
                G.add_edge(libro_nodo, libro.genero)
            if 'año' in criterios and libro.fecha:
                G.add_edge(libro_nodo, str(libro.fecha))


        # Añadir nodos al grafo
        for autor in autores:
            G.add_node(autor, tipo='autor')
        for genero in generos:
            G.add_node(genero, tipo='genero')
        for año in años:
            G.add_node(str(año), tipo='año')  # Convertimos año a str para usarlo como etiqueta

        # Verificar si el grafo tiene nodos
        if G.number_of_nodes() == 0:
            messagebox.showinfo("Sin datos", "No hay datos suficientes para generar el grafo con los criterios proporcionados.")
            return

        # Crear una nueva ventana para mostrar el grafo
        ventana_grafo = Toplevel(self.root)
        ventana_grafo.title("Grafo de Libros")

        # Crear la figura de Matplotlib
        fig = plt.Figure(figsize=(8, 6))
        ax = fig.add_subplot(111)

        # Posicionar los nodos utilizando un layout
        pos = nx.spring_layout(G, k=0.5, iterations=20)

        # Dibujar nodos y aristas
        tipos_nodos = nx.get_node_attributes(G, 'tipo')
        colores_nodos = []
        for nodo in G.nodes():
            tipo = tipos_nodos.get(nodo)
            if tipo == 'autor':
                colores_nodos.append('skyblue')
            elif tipo == 'genero':
                colores_nodos.append('lightgreen')
            elif tipo == 'año':
                colores_nodos.append('lightcoral')
            elif tipo == 'libro':
                colores_nodos.append('orange')
            else:
                colores_nodos.append('gray')

        nx.draw_networkx_nodes(G, pos, node_color=colores_nodos, node_size=1500, ax=ax)
        nx.draw_networkx_labels(G, pos, font_size=10, ax=ax)
        nx.draw_networkx_edges(G, pos, edge_color='gray', ax=ax)

        # Remover ejes
        ax.axis('off')

        # Crear el Canvas de Tkinter y agregar la figura
        canvas = FigureCanvasTkAgg(fig, master=ventana_grafo)
        canvas.draw()
        canvas.get_tk_widget().pack()
