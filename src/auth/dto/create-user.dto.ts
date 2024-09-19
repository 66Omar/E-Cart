import {
  IsNotEmpty,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsString,
  IsEmail,
} from 'class-validator';

@ValidatorConstraint({ name: 'PasswordMatch', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    const [rePasswordField] = args.constraints;
    const rePasswordValue = (args.object as any)[rePasswordField];
    return password === rePasswordValue;
  }

  defaultMessage() {
    return 'Password and re-password do not match';
  }
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Validate(PasswordMatchConstraint, ['re_password'])
  password: string;

  @IsString()
  @IsNotEmpty()
  re_password: string;
}
