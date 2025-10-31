export function mapAuthError(code?: string) {
  switch (code) {
    case "auth/user-not-found":
      return "Пользователь с таким email не найден.";
    case "auth/wrong-password":
      return "Вы ввели неправильный пароль.";
    case "auth/email-already-in-use":
      return "Этот email уже зарегистрирован.";
    case "auth/invalid-email":
      return "Неверный формат email.";
    case "auth/weak-password":
      return "Пароль слишком простой (минимум 6 символов).";
    default:
      return "Произошла ошибка авторизации. Попробуйте снова.";
  }
}