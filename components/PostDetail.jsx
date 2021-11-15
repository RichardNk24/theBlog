import React from 'react'
import moment from 'moment'

const PostDetail = ( {post} ) => {

    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
    
        if (obj) {
            if (obj.bold) {
                modifiedText = (<b key={index}>{text}</b>);
            }
        
            if (obj.italic) {
                modifiedText = (<em key={index}>{text}</em>);
            }
        
            if (obj.underline) {
                modifiedText = (<u key={index}>{text}</u>);
            }
        }
    
        switch (type) {
            case 'heading-three':
                return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
            case 'paragraph':
                return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
            case 'heading-four':
                return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
            case 'image':
            return (
                <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
                />
                );
            default:
                return modifiedText;
            }
        };

    return (
        <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className='relative overflow-hidden shadow-md mb-6'>
                <img
                    src={post.featuredImage.url}
                    url={post.title}
                    className="object-top h-full w-full rounded-t-lg"
                />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex items-center mb-8 w-full">
                    <div className="flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                        <img 
                            alt={post.author.name}
                            height="30px"
                            width="30px"
                            className="align-middle rounded-full"
                            src={post.author.photo.url}
                        />
                        <p className="inline align-middle text-gray-700 ml-2 text-lg">{post.author.name}</p>
                    </div>
                    <div className="font-medium text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 tex t-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span>
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </span>
                    </div>
                </div>
                <h1 className="mb-8 text-3xl font-semibold ">{post.title}</h1>
                {console.log(post.content.raw)}
                { post.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
                    
                    return getContentFragment(index, children, typeObj, typeObj.type)
                } )}
            </div>
        </div>
    )
}

export default PostDetail