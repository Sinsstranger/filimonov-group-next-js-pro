"use client"
import { Alert, Button, Label, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form"
import { registerSchema, RegisterSchemaType } from "@/app/auth/_models/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

export default function RegisterForm() {
  const [registerError, setRegisterError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "102@tst.local",
      password: "12345678",
      rePassword: "12345678",
    },
  })
  const onSubmit = async (data: RegisterSchemaType) => {
    setRegisterError(null)
    const { password, rePassword } = data
    if (password !== rePassword) {
      setRegisterError("Пароли не совпадают")
    }
  }
  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        {registerError && (
          <Alert
            title={registerError}
            color="failure"
          >
            {registerError}
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
            value="Password"
          />
        </div>
        <TextInput
          id="password"
          type="password"
          required
          {...register("password")}
          color={errors.password ? "failure" : undefined}
          helperText={errors.password && <span className="text-red-500">{errors.password.message}</span>}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="repassword"
            value="Repassword"
          />
        </div>
        <TextInput
          id="repassword"
          type="password"
          required
          {...register("rePassword")}
          color={errors.rePassword ? "failure" : undefined}
          helperText={errors.rePassword && <span className="text-red-500">{errors.rePassword.message}</span>}
        />
      </div>
      <Button type="submit">Зарегистрироваться</Button>
    </form>
  )
}
