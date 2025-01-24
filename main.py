import tkinter as tk
from Vistas.LogIn import InterfazLogin

if __name__ == "__main__":
    # Crear la ventana raíz de Tkinter para el login
    root = tk.Tk()

    # Crear una instancia de la vista de Login
    login = InterfazLogin(root)

    # Iniciar el loop principal de Tkinter
    root.mainloop()