"use client"
import { Alert, Button, Label, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form"
import { passwordSchema, PasswordSchemaType } from "@/app/auth/_models/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginForm() {
  const [authError, setAuthError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/"
  const router = useRouter()
  const { data: session } = useSession()
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
  useEffect(() => {
    if (session) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, session, router])
  const onSubmit = async (data: PasswordSchemaType) => {
    setAuthError(null)
    const { email, password } = data
    const result = await signIn("credentials", { email, password, redirect: false, callbackUrl })
    if (result?.ok) {
      router.push(callbackUrl)
    } else {
      setAuthError("Неправильная пара E-mail/Пароль")
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
