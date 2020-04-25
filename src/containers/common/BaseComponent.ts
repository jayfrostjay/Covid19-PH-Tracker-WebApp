import React from 'react';

export default abstract class BaseComponent extends React.Component {
    abstract checkIfMounted: boolean;
}