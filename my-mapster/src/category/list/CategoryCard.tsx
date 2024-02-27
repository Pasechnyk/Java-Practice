import {Button, Card, Col, Popconfirm, Typography} from "antd";
import NotImage from '../../assets/imagenot.png';
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {APP_ENV} from "../../env";
import {ICategoryItem} from "./types.ts";

const { Title } = Typography;

// Опис інтерфейсу властивостей компонента
interface ICategoryCardProps {
    item: ICategoryItem, // Об'єкт категорії
    handleDelete: (id: number) => void // Функція видалення категорії
}

// Компонент відображення категорії у формі картки
const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const {item, handleDelete} = props; // Розпакування властивостей компонента
    const {id, name, description, image} = item; // Розпакування властивостей категорії

    return (
        <>
            <Col style={{padding: 10}} xxl={6} lg={8} md={12} sm={12}>
                <Card
                    bodyStyle={{flex: '1', paddingBlock: '10px'}}
                    style={{height: 350, display: 'flex', flexDirection: 'column', paddingTop: '40px'}}
                    hoverable // Додає можливість взаємодії з карткою при наведенні
                    cover={
                        <img
                            style={{height: '120px', objectFit: 'contain'}} // Стилізація зображення
                            alt={name}
                            src={image ? `${APP_ENV.BASE_URL}/uploading/300_${image}` : NotImage} // Шлях до зображення категорії
                        />
                    }
                    actions={[ // Кнопки видалення та редагування категорії
                        <Link to={`/category/edit/${id}`}>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/*@ts-expect-error*/}
                            <Button type="primary" icon={<EditOutlined/>}>
                                Змінити
                            </Button>
                        </Link>,

                        <Popconfirm // Підтвердження видалення категорії
                            title="Ви дійсно бажаєте видалить категорію?"
                            onConfirm={() => handleDelete(id)} // Обробник підтвердження видалення
                            okText="Так"
                            cancelText="Ні"
                        >
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/*@ts-expect-error*/}
                            <Button type={"primary"} danger icon={<DeleteOutlined/>}>
                                Видалити
                            </Button>
                        </Popconfirm>
                    ]}
                >

                    <Meta // Властивості картки (назва та опис)
                        title={name} // Назва категорії
                        description={
                            <Title level={5} type="success">{description}</Title> // Опис категорії
                        }
                    />
                </Card>
            </Col>
        </>
    )
}

export default CategoryCard;
