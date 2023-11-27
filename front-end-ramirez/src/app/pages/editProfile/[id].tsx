import Image from "next/image";
import { Header } from "../../components/Header";
import { 
    Button,
    CheckBoxArea,
    Container,
    EditForm,
    EditFormContainer,
    IconEdit,
    IconExclude,
    InputFlex,
    ModalChangeImage,
    ModalChangeImageContainer,
    Panel,
    ProfileBasicInfo,
    ProfileData,
    ProfileImage,
    ProfileProfessionalData,
    Signal,
    SpecializationTags,
    UpdateImage
} from "./style";

import { Icon, InputContainer } from "../../styles/form";
import { 
    BagSimple, 
    Buildings, 
    Camera, 
    CurrencyCircleDollar,
    Eye,
    EyeSlash,
    FilePlus,
    Key,
    Minus,
    Plus,
    User,
    XCircle 
} from "phosphor-react";
import Email from "../../assets/email.svg";
import { pallete } from "../../styles/colors";
import { makeFadeInRightAnimation, variants, variantsItems } from "../../utils/animations";
import { motion } from "framer-motion";

const signalColors = [
    {color: pallete.green},
    {color: pallete.green},
    {color: pallete.yellow},
    {color: pallete.red},
]

export default function EditProfile() {

    const specializationOptions = [
        {name: "Specialization 1"},
        {name: "Specialization 2"},
        {name: "Specialization 3"},
        {name: "Specialization 4"}
    ]

    const selectedSpecializations = ["Specialization 1", "Specialization 2"]

    return (
        <Container
            initial='initial' 
            animate='animate' 
        >
            <Header userId={"user-id"}/>
            <ModalChangeImageContainer isActive={true}>
                <ModalChangeImage>
                    <div data-name="photoEditImage">
                        <Image
                            src={""} 
                            objectFit="cover"
                            width={100} 
                            height={100}
                            alt={"Foto de perfil"}
                        />
                        <IconEdit>
                            <FilePlus size={15} weight="bold" />
                        </IconEdit>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            placeholder="Insira aqui uma foto"
                            accept=".jpg,.jpeg,.png"
                            onChange={() => {})}
                        />
                    </div>
                    <div data-name="photoImageContent">
                        <strong>User Name</strong>
                    </div>
                    <small data-name="photoImageSpan">Personalizando meu perfil</small>
                    <button 
                        type="button" 
                        onClick={() => {}}
                    >
                        Alterar foto
                    </button>
                    <IconExclude onClick={() => {}}>
                        <XCircle color={pallete.red} size={40} weight="fill" />
                    </IconExclude>
                </ModalChangeImage>
            </ModalChangeImageContainer>
            <EditFormContainer variants={makeFadeInRightAnimation()}>
                <EditForm onSubmit={() => {}}>
                    <ProfileBasicInfo>
                        <ProfileImage onClick={() => {}}>
                            <Image 
                                src={""} 
                                objectFit="cover"
                                width={150} 
                                height={150}
                                alt={"Foto de perfil"}
                            />
                            <UpdateImage>
                                <Camera color={pallete.grayThree} size={30} weight="fill" />
                            </UpdateImage>
                        </ProfileImage>
                        <h2>User name</h2>
                    </ProfileBasicInfo>
                    <ProfileData variants={variants}>
                        <InputContainer variants={makeFadeInRightAnimation()}>
                            <Icon align="left">
                                <User size={24} color={pallete.blackFour} weight="fill" />
                            </Icon>
                            <label htmlFor="name"></label>
                            <input 
                                id="name" 
                                name="name" 
                                type="text" 
                                defaultValue="User name"
                                placeholder="Nome" 
                                onChange={(event) => {})}
                            />
                        </InputContainer>
                        <InputContainer variants={variantsItems}>
                            <Icon align="left">
                                <Image src={Email} width={24} height={24} alt="ícone de email"/>
                            </Icon>
                            <label htmlFor="email"></label>
                            <input 
                                id="email" 
                                name="email" 
                                type="text"
                                defaultValue={user.email}
                                placeholder="E-mail" 
                                onChange={(event) => {}}
                            />
                        </InputContainer>
                        <InputContainer variants={variantsItems}>
                            <Icon align="left">
                                <Key size={24} color={pallete.blackFour} weight="fill" />
                            </Icon>
                            <Icon align="right" onClick={() => {}} valuePosition={10}>
                                <Eye size={24} color={pallete.turquoiseOne} weight="fill" />
                            </Icon>
                            <label htmlFor="password"></label>
                            <input 
                                id="password" 
                                name="password"
                                type={"password"}
                                placeholder="Senha"  
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                onChange={(event) => {}}
                            />
                        </InputContainer>
                        <InputContainer variants={variantsItems}>
                            <Icon align="left">
                                <Key size={24} color={pallete.blackFour} weight="fill" />
                            </Icon>
                            <Icon align="right" onClick={handleVisibleConfirmePassword} valuePosition={10}>
                                <Eye size={24} color={pallete.turquoiseOne} weight="fill" />
                            </Icon>
                            <label htmlFor="confirm_password"></label>
                            <input 
                                id="confirm_password"
                                name="confirm_password"
                                type={"password"} 
                                placeholder="Confirmação de senha"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                onChange={(event) => {}}
                            />
                        </InputContainer>
                    </ProfileData>
                    <ProfileProfessionalData>
                        <CheckBoxArea>
                            <input 
                                title="Checkbox para registro de fotógrafo" 
                                type="checkbox" 
                                id="photographer" 
                                name="photographer" 
                                checked={true}
                                disabled={true}
                                onChange={() => {}}
                            />
                            <label htmlFor="photographer">Quero ser fotógrafo</label>
                        </CheckBoxArea>
                        <Panel active={true} animate={"animate"} >
                            <InputContainer variants={variantsItems}>
                                <label htmlFor="about"></label>
                                <textarea 
                                    id="about"
                                    name="about" 
                                    defaultValue={user.bio}
                                    placeholder="Escreva sobre você..."
                                    cols={50}
                                    minLength={0}
                                    maxLength={1000}
                                    onChange={(event) => {}} 
                                />
                            </InputContainer>
                            <InputContainer isselect="true" variants={variantsItems}>
                                <Icon align="left">
                                    <BagSimple size={24} color={pallete.blackFour} weight="fill" />
                                </Icon>
                                <label htmlFor="especializations"></label>
                                <select 
                                    id="especializations"
                                    name="especializations"
                                    placeholder="Especialização"
                                    defaultValue="Especialização"
                                    onChange={(event) => {}}
                                    required={true}
                                >
                                    {specializationOptions.map((specialization) => (
                                        <option key={specialization.name} value={specialization.name}>{specialization.name}</option>
                                    ))}
                                </select>
                            </InputContainer>
                            <SpecializationTags variants={variants}>
                                <legend>
                                    Especializações {selectedSpecializations ? selectedSpecializations.length : "0" }/3
                                    <Signal color={pallete.green}/>
                                </legend>
                                {selectedSpecializations.map((specialization) => (
                                    <motion.li
                                        variants={variants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={specialization} 
                                        onClick={() => {}}
                                    >
                                        <span>{specialization}</span>
                                        <XCircle size={20} weight="fill" />
                                    </motion.li>
                                ))}
                            </SpecializationTags>
                            <div>
                                <InputContainer variants={variantsItems}>
                                    <Icon align="left">
                                        <CurrencyCircleDollar size={24} color={pallete.blackFour} weight="fill" />
                                    </Icon>
                                    <Icon 
                                        align="right" 
                                        title="Valor mínimo"
                                        data-title="minus"
                                        valuePosition={40}
                                        onClick={() => {}}
                                    >
                                        <Minus 
                                            size={24} 
                                            color={pallete.red} 
                                            weight="bold" 
                                        />
                                    </Icon>
                                    <Icon 
                                        align="right" 
                                        title="Valor máximo"
                                        data-title="plus"
                                        valuePosition={10}
                                        onClick={() => {}}
                                    >
                                        <Plus 
                                            size={24} 
                                            color={pallete.green} 
                                            weight="bold" 
                                        />
                                    </Icon>
                                    <label htmlFor="min_value"></label>
                                    <input 
                                        id="min_value" 
                                        name="min_value" 
                                        type={"number"}
                                        value={0}
                                        onChange={(event) => {}}
                                        placeholder="Valor mínimo"
                                        min={0}
                                    />
                                </InputContainer>
                                <InputContainer variants={variantsItems}>
                                    <Icon align="left">
                                        <CurrencyCircleDollar size={24} color={pallete.blackFour} weight="fill" />
                                    </Icon>
                                    <Icon 
                                        align="right" 
                                        title="Valor mínimo"
                                        data-title="minus"
                                        valuePosition={40}
                                        onClick={() => {}}
                                    >
                                        <Minus 
                                            size={24} 
                                            color={pallete.red} 
                                            weight="bold" 
                                        />
                                    </Icon>
                                    <Icon 
                                        align="right" 
                                        title="Valor máximo"
                                        data-title="plus"
                                        valuePosition={10}
                                        onClick={() => {}}
                                    >
                                        <Plus 
                                            size={24} 
                                            color={pallete.green} 
                                            weight="bold" 
                                        />
                                    </Icon>
                                    <label htmlFor="max_value"></label>
                                    <input 
                                        id="max_value" 
                                        name="max_value" 
                                        type={"number"}
                                        value={""}
                                        onChange={(event) => {}}
                                        placeholder="Valor máximo"
                                        min={0}
                                    />
                                </InputContainer>
                                <InputFlex>
                                    <InputContainer>
                                        <Icon align="left">
                                            <Buildings size={24} color={pallete.blackFour} weight="fill" />
                                        </Icon>
                                        <label htmlFor="city"></label>
                                        <input 
                                            type="text"
                                            id="city"
                                            name="city"
                                            defaultValue={user.city}
                                            placeholder="Cidade"
                                            onChange={(event) => {}}
                                            required={true}
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Icon align="left">
                                            <Buildings size={24} color={pallete.blackFour} weight="fill" />
                                        </Icon>
                                        <label htmlFor="state"></label>
                                        <input 
                                            type="text"
                                            id="state"
                                            name="state"
                                            defaultValue={user.state}
                                            placeholder="Estado"
                                            onChange={(event) => {}}
                                            required={true}
                                        />
                                    </InputContainer>
                                </InputFlex>
                            </div>
                        </Panel>
                    </ProfileProfessionalData>
                    <Button type="submit">Confirmar</Button>
                </EditForm>
            </EditFormContainer>
        </Container>
    )
}