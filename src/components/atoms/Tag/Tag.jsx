import StyledTag from "./tag"
export const Tag = (props) =>{
    return(
        <StyledTag variant={props.variant}>
            {props.label}
        </StyledTag>
    )
}