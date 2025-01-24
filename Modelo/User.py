usuarios = [
    ("AdminB", "123456")
]

def verificar_login(usuario_ingresado, contraseña_ingresada):
    for usuario, contraseña in usuarios:
        if usuario == usuario_ingresado and contraseña == contraseña_ingresada:
            return True
    return False