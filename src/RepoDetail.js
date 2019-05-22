    import React from 'react';

function RepoDetail(props) {
    const {selectedRepo} = props;
    return (
        <div>
            {props.selectedRepo && props.selectedRepo.name ?
            <div>
                <p> name: {selectedRepo.name}</p>
                <p> language: {selectedRepo.language}</p>
                <p> description: {selectedRepo.description}</p>
                <p> stars: {selectedRepo.stargazers_count}</p>
                <p> creation date: {selectedRepo.created_at}</p>
                <p> last updated at: {selectedRepo.updated_at}</p>
                <p> github link: <a href={selectedRepo.html_url}>{selectedRepo.html_url}</a></p>
            </div>
            : 
            <span></span>
            }
    </div>
    );
}

export default RepoDetail;