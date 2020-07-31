import {User} from '../../entities/User';
import {IUserRepository} from '../../repositories/IUsersRepository';
import {ICreateUserRequestDTO} from '../CreateUser/CreateUserDTO';
import {IMailProvider} from '../../providers/IMailProvider'

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvidade: IMailProvider,
  ) { }

  async execute(data: ICreateUserRequestDTO) {
    const isExistUser = await this.usersRepository.findByEmail(data.email);

    if(isExistUser) {
      throw new Error('usuário já cadastrado.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvidade.sendMail({      
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'equipe do app',
        email: 'app@app.com.br'
      },
      subject:'bem-vindo',
      body:'<p>cadatro realizado com sucesso.</p>'
    });
  }
}