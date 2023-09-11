import Authenticated from "@/Layouts/Authenticated";
import {Autocomplete, createFilterOptions, IconButton, InputBase, Paper} from "@mui/material";
import React, {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import {Link} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

const filter = createFilterOptions<KeywordType>();

interface KeywordType {
    title: string
}

export default function Index(props: any) {
    const [keyword, setKeyword] = useState(props.keyword ?? '');
    const histories = props.history.map((data: any, index: number) => {
        return {title: data.text};
    });
    return (
        <>
            <Authenticated auth={props.auth} header="search" flash={props.flash}>
                <Container>
                    <div className="pt-5">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="text-center">
                                    <Paper
                                        component="form"
                                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
                                    >
                                        <Autocomplete
                                            value={keyword}
                                            onChange={(event, newValue) => {
                                                if (newValue == null) {
                                                    setKeyword("")
                                                } else {
                                                    setKeyword(newValue.title);
                                                }
                                            }}
                                            filterOptions={(options, params) => {
                                                return filter(options, params);
                                            }}
                                            selectOnFocus
                                            clearOnBlur
                                            handleHomeEndKeys
                                            id="free-solo-with-text-demo"
                                            options={histories}
                                            getOptionLabel={(option) => {
                                                // Value selected with enter, right from the input
                                                if (typeof option === 'string') {
                                                    return option;
                                                }
                                                // Add "xxx" option created dynamically
                                                if (option.inputValue) {
                                                    return option.inputValue;
                                                }
                                                // Regular option
                                                return option.title;
                                            }}
                                            renderOption={(props, option) => <li {...props}>{option.title}</li>}
                                            sx={{width: "100%", border: "none"}}
                                            freeSolo
                                            renderInput={(params) => {
                                                const {InputLabelProps, InputProps, ...rest} = params;
                                                return <InputBase {...params.InputProps} {...rest} sx={{ml: 1, flex: 1}}
                                                                  placeholder="検索" onChange={(event) => {
                                                    setKeyword(event.target.value ?? '');
                                                }}/>
                                            }}
                                        />
                                        <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={() => {
                                            Inertia.get(route('auth.search.index', {"q": keyword}))
                                        }}>
                                            <SearchIcon/>
                                        </IconButton>

                                    </Paper>
                                </div>
                            </div>
                        </div>
                    </div>

                    {(() => {
                        if (props.keyword != "") {
                            return (
                                <div className="pt-5">
                                    <div className="max-w-7xl mx-auto">
                                        <p>検索結果</p>
                                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-3">
                                            <Link href={route('auth.search.index', {'q': 'a'})}>
                                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-4">
                                                    ab
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })()}

                </Container>
            </Authenticated>
        </>
    )
        ;
}
