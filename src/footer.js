import { Grid, Hidden } from "@mui/material";

export default function Footer() {
    return (
        <Hidden smDown>
            <div className="footer">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={3} className="footer-item">
                        <h1>Ha Noi</h1>
                        <div className="divisor"></div>
                        <p>
                            Golden Park Building, 2 Pham Van Bach, Yen Hoa dist, Cau
                            Giay ward, Ha Noi
                        </p>
                        <p>
                            <span>Training Organization & Management Dept.</span>
                            <br />
                            024.730 66788 - No 1
                            <br />
                            acad.gre.hn@fe.edu.vn
                        </p>
                        <p>
                            <span>Student Relations Dept.</span>
                            <br />
                            024.730 66788 - No 2
                            <br />
                            sro.gre.hn@fe.edu.vn
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className="footer-item">
                        <h1>Ho Chi Minh</h1>
                        <div className="divisor"></div>
                        <p>20 Cong Hoa, 12 ward, Tan Binh district, Ho Chi Minh</p>
                        <p>
                            <span>Training Organization & Management Dept.</span>
                            <br />
                            028 7300 6622
                            <br />
                            acad.gre.hcm@fe.edu.vn
                        </p>
                        <p>
                            <span>Student Relations Dept.</span>
                            <br />
                            028 7300 6622
                            <br />
                            ctsvfgwhcm@fe.edu.vn
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className="footer-item">
                        <h1>Da Nang</h1>
                        <div className="divisor"></div>
                        <p>
                            658 Ngo Quyen, An Hai Bac ward, Son Tra district, Da
                            Nang
                        </p>
                        <p>
                            <span>Training Organization & Management Dept.</span>
                            <br />
                            02367. 305.767
                            <br />
                            acad.gre.dn@fe.edu.vn
                        </p>
                        <p>
                            <span>Student Relations Dept.</span>
                            <br />
                            024.730 66788
                            <br />
                            sro.gre.dn@fe.edu.vn
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className="footer-item">
                        <h1>Can Tho</h1>
                        <div className="divisor"></div>
                        <p>
                            160 30/4 street, An Phu ward, Ninh Kieu district, Can
                            Tho
                        </p>
                        <p>
                            <span>Training Organization & Management Dept.</span>
                            <br />
                            acad.gre.ct@fe.edu.vn
                        </p>
                        <p>
                            <span>Student Relations Dept.</span>
                            <br />
                            02923.512.369
                            <br />
                            sro.gre.ct@fe.edu.vn
                        </p>
                    </Grid>
                </Grid>
                <div className="icon-row">
                    <svg
                        fill="#000000"
                        height="30px"
                        width="30px"
                        version="1.1"
                        className="icon"
                        viewBox="-143 145 512 512">
                        <path
                            d="M-143,145v512h512V145H-143z M169.5,357.6l-2.9,38.3h-39.3v133H77.7v-133H51.2v-38.3h26.5v-25.7c0-11.3,0.3-28.8,8.5-39.7
	c8.7-11.5,20.6-19.3,41.1-19.3c33.4,0,47.4,4.8,47.4,4.8l-6.6,39.2c0,0-11-3.2-21.3-3.2c-10.3,0-19.5,3.7-19.5,14v29.9H169.5z"
                        />
                    </svg>
                    <svg
                        fill="#000000"
                        height="30px"
                        width="30px"
                        version="1.1"
                        viewBox="-143 145 512 512"
                        className="icon">
                        <path
                            d="M-143,145v512h512V145H-143z M215.2,361.2c0.1,2.2,0.1,4.5,0.1,6.8c0,69.5-52.9,149.7-149.7,149.7
	c-29.7,0-57.4-8.7-80.6-23.6c4.1,0.5,8.3,0.7,12.6,0.7c24.6,0,47.3-8.4,65.3-22.5c-23-0.4-42.5-15.6-49.1-36.5
	c3.2,0.6,6.5,0.9,9.9,0.9c4.8,0,9.5-0.6,13.9-1.9C13.5,430-4.6,408.7-4.6,383.2v-0.6c7.1,3.9,15.2,6.3,23.8,6.6
	c-14.1-9.4-23.4-25.6-23.4-43.8c0-9.6,2.6-18.7,7.1-26.5c26,31.9,64.7,52.8,108.4,55c-0.9-3.8-1.4-7.8-1.4-12
	c0-29,23.6-52.6,52.6-52.6c15.1,0,28.8,6.4,38.4,16.6c12-2.4,23.2-6.7,33.4-12.8c-3.9,12.3-12.3,22.6-23.1,29.1
	c10.6-1.3,20.8-4.1,30.2-8.3C234.4,344.5,225.5,353.7,215.2,361.2z"
                        />
                    </svg>
                    <svg
                        fill="#000000"
                        height="30px"
                        width="30px"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        viewBox="-143 145 512 512">
                        <g>
                            <path
                                d="M183,401c0,38.6-31.4,70-70,70c-38.6,0-70-31.4-70-70c0-9.3,1.9-18.2,5.2-26.3H10v104.8C10,493,21,504,34.5,504h157
		c13.5,0,24.5-11,24.5-24.5V374.7h-38.2C181.2,382.8,183,391.7,183,401z"
                            />
                            <polygon points="211.4,345.9 211.4,308.1 211.4,302.5 205.8,302.5 168,302.6 168.2,346" />
                            <path
                                d="M113,446c24.8,0,45.1-20.2,45.1-45.1c0-9.8-3.2-18.9-8.5-26.3c-8.2-11.3-21.5-18.8-36.5-18.8s-28.3,7.4-36.5,18.8
		c-5.3,7.4-8.5,16.5-8.5,26.3C68,425.8,88.2,446,113,446z"
                            />
                            <path
                                d="M-143,145v512h512V145H-143z M241,374.7v104.8c0,27.3-22.2,49.5-49.5,49.5h-157C7.2,529-15,506.8-15,479.5V374.7v-52.3
		c0-27.3,22.2-49.5,49.5-49.5h157c27.3,0,49.5,22.2,49.5,49.5V374.7z"
                            />
                        </g>
                    </svg>
                    <svg
                        version="1.1"
                        height="30px"
                        width="30px"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        viewBox="0 0 512 512">
                        <g>
                            <path
                                class="st0"
                                d="M0,0.002v511.996h512v-18.071V0.002H0z M475.859,475.856H36.141v-364.43h439.718V475.856z"
                            />
                            <rect
                                x="78.305"
                                y="167.994"
                                class="st0"
                                width="355.386"
                                height="96.723"
                            />
                            <rect
                                x="295.152"
                                y="309.894"
                                class="st0"
                                width="138.538"
                                height="118.968"
                            />
                            <rect
                                x="78.305"
                                y="311.694"
                                class="st0"
                                width="162.631"
                                height="18.07"
                            />
                            <rect
                                x="78.305"
                                y="408.991"
                                class="st0"
                                width="162.631"
                                height="18.071"
                            />
                            <rect
                                x="78.305"
                                y="360.347"
                                class="st0"
                                width="162.631"
                                height="18.071"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </Hidden>
    );
}
