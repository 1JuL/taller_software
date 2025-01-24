from tkinter import *
from tkinter import messagebox
from tkinter import ttk
from PIL import Image, ImageTk  # Para manejar la imagen de logo
from Controlador.ControladorLogIn import ControladorLogin
from Vistas.Inicio import InterfazInicio

class InterfazLogin:
    def __init__(self, root):
        self.root = root
        self.controlador_login = ControladorLogin()
        self.root.title("LogIn")
        self.root.geometry("450x500+560+240")
        self.root.configure(bg="#f0f0f0")  # Color de fondo claro

        # Crear un frame central para contener los elementos de login
        frame_central = Frame(self.root, bg="white", bd=2, relief=RIDGE)
        frame_central.place(x=50, y=50, width=350, height=400)

        # Añadir el logo (imagen de ejemplo)
        try:
            self.logo = Image.open("logo.png")  # Ruta de la imagen del logo
            self.logo = self.logo.resize((80, 80), Image.ANTIALIAS)
            self.logo = ImageTk.PhotoImage(self.logo)
            logo_label = Label(frame_central, image=self.logo, bg="white")
            logo_label.place(x=135, y=20)
        except:
            pass  # Si la imagen no está disponible, simplemente no la mostramos

        # Título de la aplicación
        titulo = Label(frame_central, text="Bienvenido a la Biblioteca", font=("Helvetica", 16, "bold"), bg="white", fg="#333333")
        titulo.place(x=50, y=120)

        # Etiqueta y campo para el usuario
        Usuario = Label(frame_central, text="Usuario:", font=("Helvetica", 12), bg="white", fg="#666666")
        Usuario.place(x=30, y=160)
        self.UsuarioField = Entry(frame_central, font=("Helvetica", 12), bd=2, relief=GROOVE)
        self.UsuarioField.place(x=30, y=190, width=280, height=30)

        # Etiqueta y campo para la contraseña
        Contraseña = Label(frame_central, text="Contraseña:", font=("Helvetica", 12), bg="white", fg="#666666")
        Contraseña.place(x=30, y=230)
        self.ContraseñaField = Entry(frame_central, show="*", font=("Helvetica", 12), bd=2, relief=GROOVE)
        self.ContraseñaField.place(x=30, y=260, width=280, height=30)

        # Botón para iniciar sesión
        self.BotonLogin = Button(frame_central, text="Iniciar Sesión", font=("Helvetica", 14, "bold"), bg="#4CAF50", fg="white",
                                command=self.validar_login, cursor="hand2")
        self.BotonLogin.place(x=100, y=320, width=150, height=40)

        # Vincular el evento "Enter" a la función validar_login
        self.root.bind('<Return>', self.on_enter_key)

        root.mainloop()

    # Método para manejar la tecla Enter
    def on_enter_key(self, event):
        self.validar_login()

    # Método para validar el login
    def validar_login(self):
        usuario = self.UsuarioField.get().strip()
        contraseña = self.ContraseñaField.get().strip()

        # Llamar al método del controlador para verificar las credenciales
        if self.controlador_login.validar_credenciales(usuario, contraseña):
            messagebox.showinfo("Éxito", "Inicio de sesión exitoso.")
            # Aquí se cierra la ventana de login y se abre la ventana principal
            self.root.destroy()  # Cerrar la ventana de login
            self.abrir_ventana_inicio()
        else:
            messagebox.showerror("Error", "Usuario o contraseña incorrectos.")

    # Método para abrir la ventana de inicio
    def abrir_ventana_inicio(self):
        nueva_ventana = Tk()
        InterfazInicio(nueva_ventana)  # Inicializar la interfaz de inicio
        nueva_ventana.mainloop()
