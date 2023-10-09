import Title from '@/components/title/title';
import React, { FC } from 'react';
import styles from './page.module.scss';

type PageProps = {};

const Folders: FC<PageProps> = (props) => {
	return (
		<div className="container">
			<Title title="Домашня" />
			<p className={styles.pimpa}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, dolorum.</p>
		</div>
	);
};

export default Folders;
