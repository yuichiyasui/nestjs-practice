import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { passwordRegExp } from 'src/constants/regexp';
import { IsEqualTo } from 'src/decorators/validation/is-equal-to.decorator';

export class SignUpRequestDto {
  @ApiProperty({
    example: 'a3c68fa7-896c-46eb-8e7b-cb854aef63d0',
    title: 'ユーザー登録用のトークン',
  })
  @IsNotEmpty()
  readonly signUpToken!: string;

  @ApiProperty({
    example: 'ほげ太郎',
    title: 'ユーザー名',
    description: 'アプリ内での表示用',
  })
  @IsNotEmpty({ message: 'ユーザー名が入力されていません' })
  readonly userName!: string;

  @ApiProperty({
    title: 'パスワード',
    description: '英大文字小文字数字記号のいずれか3種類以上を含む8桁以上',
    example: 'hogeHOGE123',
  })
  @IsNotEmpty({ message: 'パスワードが入力されていません' })
  @MinLength(8, { message: 'パスワードが最低文字数を満たしていません' })
  @MaxLength(32, { message: 'パスワードが最大文字数を超過しています' })
  @Matches(passwordRegExp, {
    message: 'パスワードが条件を満たしていません',
  })
  readonly password!: string;

  @ApiProperty({
    title: '確認用パスワード',
    example: 'hogeHOGE123',
  })
  @IsNotEmpty({ message: '確認用パスワードが入力されていません' })
  @IsEqualTo<SignUpRequestDto>('password', {
    message: 'パスワードが一致していません',
  })
  readonly confirmationPassword!: string;
}
