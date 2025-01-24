import tkinter as tk
from tkinter import messagebox, filedialog
from Modelo.Libros import libros as Libros
import os
import shutil

class InterfazIngresoLibros:
    def __init__(self, root, controlador, actualizar_callback, libro_modificar=None):
        self.root = root
        self.controlador = controlador
        self.actualizar_callback = actualizar_callback
        self.libro_modificar = libro_modificar
        self.root.title("Ingreso de Libros")
        self.root.geometry("600x500")
        self.centrar_ventana(600, 500)  # Centrar la ventana
        self.root.configure(bg="#f7f7f7")  # Color de fondo más claro

        # Etiqueta título principal
        titulo_principal = tk.Label(root, text="Ingreso de Libros", font=("Helvetica", 18, "bold"), bg="#f7f7f7", fg="#333")
        titulo_principal.pack(pady=20)

        # Frame de ingreso de datos para una mejor organización
        frame_datos = tk.Frame(root, bg="#f7f7f7")
        frame_datos.pack(pady=10)

        # Campo Título
        tk.Label(frame_datos, text="Título:", font=("Helvetica", 12), bg="#f7f7f7", anchor="w").grid(row=0, column=0, padx=10, pady=5, sticky="w")
        self.entry_titulo = tk.Entry(frame_datos, font=("Helvetica", 12), width=40)
        self.entry_titulo.grid(row=0, column=1, padx=10, pady=5)

        # Campo Autor
        tk.Label(frame_datos, text="Autor:", font=("Helvetica", 12), bg="#f7f7f7", anchor="w").grid(row=1, column=0, padx=10, pady=5, sticky="w")
        self.entry_autor = tk.Entry(frame_datos, font=("Helvetica", 12), width=40)
        self.entry_autor.grid(row=1, column=1, padx=10, pady=5)

        # Campo Género
        tk.Label(frame_datos, text="Género:", font=("Helvetica", 12), bg="#f7f7f7", anchor="w").grid(row=2, column=0, padx=10, pady=5, sticky="w")
        self.entry_genero = tk.Entry(frame_datos, font=("Helvetica", 12), width=40)
        self.entry_genero.grid(row=2, column=1, padx=10, pady=5)

        # Campo Año
        tk.Label(frame_datos, text="Año:", font=("Helvetica", 12), bg="#f7f7f7", anchor="w").grid(row=3, column=0, padx=10, pady=5, sticky="w")
        self.entry_año = tk.Entry(frame_datos, font=("Helvetica", 12), width=40)
        self.entry_año.grid(row=3, column=1, padx=10, pady=5)

        # Campo Portada
        tk.Label(frame_datos, text="Portada:", font=("Helvetica", 12), bg="#f7f7f7", anchor="w").grid(row=4, column=0, padx=10, pady=5, sticky="w")
        self.portada_label = tk.Label(frame_datos, text="No seleccionada", font=("Helvetica", 10), bg="#f7f7f7", fg="gray")
        self.portada_label.grid(row=4, column=1, padx=10, pady=5, sticky="w")

        # Botón para añadir portada
        boton_portada = tk.Button(frame_datos, text="Añadir portada", command=self.SeleccionarImagen, font=("Helvetica", 10, "bold"),
                                bg="#457b9d", fg="white", relief="flat", cursor="hand2")
        boton_portada.grid(row=4, column=2, padx=10, pady=5)

        # Si estamos modificando un libro, rellenar los campos con los datos existentes
        if self.libro_modificar:
            self.entry_titulo.insert(0, self.libro_modificar['titulo'])
            self.entry_autor.insert(0, self.libro_modificar['autor'])
            self.entry_genero.insert(0, self.libro_modificar['genero'])
            self.entry_año.insert(0, self.libro_modificar['fecha'])
            self.portada_path = self.libro_modificar['portada']
            self.portada_label.config(text=os.path.basename(self.portada_path))
        else:
            self.portada_path = None

        # Frame para los botones de acciones
        frame_botones = tk.Frame(root, bg="#f7f7f7")
        frame_botones.pack(pady=30)  # Más espaciado para que se note claramente

        # Botón para añadir o modificar el libro
        if self.libro_modificar:
            boton_guardar = tk.Button(frame_botones, text="Guardar Cambios", command=self.guardar_cambios, font=("Helvetica", 14, "bold"),
                                    bg="#ffba08", fg="black", relief="raised", cursor="hand2", padx=20, pady=10)
        else:
            boton_guardar = tk.Button(frame_botones, text="Agregar Libro", command=self.agregar_libro, font=("Helvetica", 14, "bold"),
                                    bg="#2a9d8f", fg="white", relief="raised", cursor="hand2", padx=20, pady=10)
        boton_guardar.grid(row=0, column=0, padx=20, pady=10)

    def centrar_ventana(self, ancho, alto):
        pantalla_ancho = self.root.winfo_screenwidth()
        pantalla_alto = self.root.winfo_screenheight()
        x = int((pantalla_ancho / 2) - (ancho / 2))
        y = int((pantalla_alto / 2) - (alto / 2))
        self.root.geometry(f"{ancho}x{alto}+{x}+{y}")

    def SeleccionarImagen(self):
        # Abrir el cuadro de diálogo para seleccionar la imagen
        ruta_imagen = filedialog.askopenfilename(
            title="Seleccionar Imagen",
            filetypes=[("Archivos de Imagen", "*.jpg *.jpeg *.png *.bmp *.gif *.jfif")]
        )

        if ruta_imagen:
            # Si se selecciona una imagen, copiarla a la carpeta Assets
            try:
                carpeta_destino = "Assets"
                if not os.path.exists(carpeta_destino):
                    os.makedirs(carpeta_destino)

                # Obtener el nombre del archivo seleccionado
                nombre_archivo = os.path.basename(ruta_imagen)

                # Crear la ruta de destino para copiar la imagen
                destino = os.path.join(carpeta_destino, nombre_archivo)

                # Copiar la imagen a la carpeta Assets
                shutil.copy(ruta_imagen, destino)

                # Guardar la ruta de la imagen copiada
                self.portada_path = destino
                self.portada_label.config(text=nombre_archivo)  # Mostrar el nombre de la imagen seleccionada
                messagebox.showinfo("Éxito", f"Imagen seleccionada: {nombre_archivo}")

            except Exception as e:
                messagebox.showerror("Error", f"No se pudo copiar la imagen: {str(e)}")
                self.portada_path = None
    
    def guardar_cambios(self):
        # Obtener la información ingresada por el usuario
        titulo = self.entry_titulo.get().strip()
        autor = self.entry_autor.get().strip()
        genero = self.entry_genero.get().strip()
        año = self.entry_año.get().strip()

        # Validaciones básicas
        if not titulo or not autor or not genero or not año:
            messagebox.showerror("Error", "Todos los campos son obligatorios.")
            return

        if not año.isdigit():
            messagebox.showerror("Error", "El campo 'Año' debe ser un número válido.")
            return

        # Crear un objeto Libro con la información actualizada
        libro_actualizado = Libros(titulo, autor, int(año), genero, id=0, portada=self.portada_path)

        # Llamar al controlador para modificar el libro
        try:
            self.controlador.modificar_libro(self.libro_modificar['titulo'], libro_actualizado)
            messagebox.showinfo("Éxito", "Libro modificado exitosamente.")
            self.root.destroy()
        except Exception as e:
            messagebox.showerror("Error", f"Error al modificar el libro: {str(e)}")

        # Llamar al método de actualización en la vista principal para actualizar los libros
        if self.actualizar_callback:
            self.actualizar_callback()
    def agregar_libro(self):
        # Obtener la información ingresada por el usuario
        titulo = self.entry_titulo.get().strip()
        autor = self.entry_autor.get().strip()
        genero = self.entry_genero.get().strip()
        año = self.entry_año.get().strip()

        # Validaciones básicas
        if not titulo or not autor or not genero or not año or not self.portada_path:
            messagebox.showerror("Error", "Todos los campos son obligatorios, incluida la portada.")
            return

        if not año.isdigit():
            messagebox.showerror("Error", "El campo 'Año' debe ser un número válido.")
            return

        # Crear un objeto Libro con la información ingresada
        nuevo_libro = Libros(titulo, autor, int(año), genero, id=0, portada=self.portada_path)

        # Llamar al controlador para agregar el libro
        try:
            self.controlador.agregar_libro(nuevo_libro)
            messagebox.showinfo("Éxito", "Libro agregado exitosamente.")
            # Limpiar los campos de entrada
            self.entry_titulo.delete(0, tk.END)
            self.entry_autor.delete(0, tk.END)
            self.entry_genero.delete(0, tk.END)
            self.entry_año.delete(0, tk.END)
            self.portada_path = None
        except Exception as e:
            messagebox.showerror("Error", f"Error al agregar el libro: {str(e)}")

        # Llamar al método de actualización en la vista principal para actualizar los libros
        if self.actualizar_callback:
            self.actualizar_callback()