"use client"
import { Alert, Button, Label, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form"
import { passwordSchema, PasswordSchemaType } from "@/app/auth/_models/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function LoginForm() {
  const [authError, setAuthError] = useState<string | null>(null)
  const { data, status } = useSession()
  useEffect(() => {
    console.log(data, status)
  }, [data, status])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: "test@example.local",
      password: "",
    },
  })
  const onSubmit = async (data: PasswordSchemaType) => {
    setAuthError(null)
    const { email, password } = data
    const result = await signIn("credentials", { email, password, redirect: false })
    if (result?.ok) {
    } else {
      setAuthError("неправильная пара E-mail/Пароль")
    }
  }

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        {authError && (
          <Alert
            title={authError}
            color="failure"
          >
            {authError}
          </Alert>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Email"
          />
        </div>
        <TextInput
          id="email"
          type="email"
          required
          {...register("email")}
          color={errors.email ? "failure" : undefined}
          helperText={errors.email && <span className="text-red-500">{errors.email.message}</span>}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Пароль"
          />
        </div>
        <TextInput
          id="password"
          type="password"
          {...register("password")}
          color={errors.password ? "failure" : undefined}
          helperText={errors.password && <span className="text-red-500">{errors.password.message}</span>}
          required
        />
      </div>
      <Button type="submit">Войти</Button>
    </form>
  )
}
