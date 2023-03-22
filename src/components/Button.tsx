import buttons from "./utils/Buttons";

function Button(props: any) {
    let targetIcon = null;
    targetIcon = buttons.find(item => item.name == props.icon)?.icon;
    return (
        <div dangerouslySetInnerHTML={{ __html: targetIcon }} />
    )
}

export default Button;