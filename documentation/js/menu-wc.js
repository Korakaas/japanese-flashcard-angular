'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">japanese-flashcard-angular documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-d581f620844bf4e89cf44fa469eaae9cd4e29763b6fa940fb2a15b5430fe98877cf606d5cf73d58894e16390ce9eef12e0d32ba3e926f9c4e0985dfff9d708ee"' : 'data-bs-target="#xs-components-links-module-AppModule-d581f620844bf4e89cf44fa469eaae9cd4e29763b6fa940fb2a15b5430fe98877cf606d5cf73d58894e16390ce9eef12e0d32ba3e926f9c4e0985dfff9d708ee"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d581f620844bf4e89cf44fa469eaae9cd4e29763b6fa940fb2a15b5430fe98877cf606d5cf73d58894e16390ce9eef12e0d32ba3e926f9c4e0985dfff9d708ee"' :
                                            'id="xs-components-links-module-AppModule-d581f620844bf4e89cf44fa469eaae9cd4e29763b6fa940fb2a15b5430fe98877cf606d5cf73d58894e16390ce9eef12e0d32ba3e926f9c4e0985dfff9d708ee"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-974e8e58da50de707b1bb2df5e5dc08aa92446619379f7088d6827d9b4674c88082d26de8c347d0bb7418ead7ee6978b194ecb20ada7731f2e5ac01f93c23851"' : 'data-bs-target="#xs-components-links-module-AuthModule-974e8e58da50de707b1bb2df5e5dc08aa92446619379f7088d6827d9b4674c88082d26de8c347d0bb7418ead7ee6978b194ecb20ada7731f2e5ac01f93c23851"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-974e8e58da50de707b1bb2df5e5dc08aa92446619379f7088d6827d9b4674c88082d26de8c347d0bb7418ead7ee6978b194ecb20ada7731f2e5ac01f93c23851"' :
                                            'id="xs-components-links-module-AuthModule-974e8e58da50de707b1bb2df5e5dc08aa92446619379f7088d6827d9b4674c88082d26de8c347d0bb7418ead7ee6978b194ecb20ada7731f2e5ac01f93c23851"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DecksModule.html" data-type="entity-link" >DecksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DecksModule-1cb4b4915955168d34f8e6addae558072735fbf15cc88f63b02687d5b3a4d51562c95049cda8ef42ffd9104a9578fc0bb028f81377d2ca48703adfcdb108a8ad"' : 'data-bs-target="#xs-components-links-module-DecksModule-1cb4b4915955168d34f8e6addae558072735fbf15cc88f63b02687d5b3a4d51562c95049cda8ef42ffd9104a9578fc0bb028f81377d2ca48703adfcdb108a8ad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DecksModule-1cb4b4915955168d34f8e6addae558072735fbf15cc88f63b02687d5b3a4d51562c95049cda8ef42ffd9104a9578fc0bb028f81377d2ca48703adfcdb108a8ad"' :
                                            'id="xs-components-links-module-DecksModule-1cb4b4915955168d34f8e6addae558072735fbf15cc88f63b02687d5b3a4d51562c95049cda8ef42ffd9104a9578fc0bb028f81377d2ca48703adfcdb108a8ad"' }>
                                            <li class="link">
                                                <a href="components/DAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DIndexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DIndexComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DTestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DTestComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DecksRoutingModule.html" data-type="entity-link" >DecksRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FlashcardsModule.html" data-type="entity-link" >FlashcardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FlashcardsModule-70f70384a1acad69d65c451e61bb2a82de68b05ad444de42714453e51a5dc5535d469a882c4e52070e535d1b015a1f11389028c1976f77d18706c7429b3e5e1e"' : 'data-bs-target="#xs-components-links-module-FlashcardsModule-70f70384a1acad69d65c451e61bb2a82de68b05ad444de42714453e51a5dc5535d469a882c4e52070e535d1b015a1f11389028c1976f77d18706c7429b3e5e1e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FlashcardsModule-70f70384a1acad69d65c451e61bb2a82de68b05ad444de42714453e51a5dc5535d469a882c4e52070e535d1b015a1f11389028c1976f77d18706c7429b3e5e1e"' :
                                            'id="xs-components-links-module-FlashcardsModule-70f70384a1acad69d65c451e61bb2a82de68b05ad444de42714453e51a5dc5535d469a882c4e52070e535d1b015a1f11389028c1976f77d18706c7429b3e5e1e"' }>
                                            <li class="link">
                                                <a href="components/FAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FIndexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FIndexComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FlashcardsRoutingModule.html" data-type="entity-link" >FlashcardsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PublicModule.html" data-type="entity-link" >PublicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PublicModule-cc85a5f0046022ca7b171615680ea41e0e504f1abef72e6190bd5eb22661c6ab28470a18e42d9c3af1c0638ea89ee92b0fd5b2426ea6e29933e4ea7bcc77d5ae"' : 'data-bs-target="#xs-components-links-module-PublicModule-cc85a5f0046022ca7b171615680ea41e0e504f1abef72e6190bd5eb22661c6ab28470a18e42d9c3af1c0638ea89ee92b0fd5b2426ea6e29933e4ea7bcc77d5ae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublicModule-cc85a5f0046022ca7b171615680ea41e0e504f1abef72e6190bd5eb22661c6ab28470a18e42d9c3af1c0638ea89ee92b0fd5b2426ea6e29933e4ea7bcc77d5ae"' :
                                            'id="xs-components-links-module-PublicModule-cc85a5f0046022ca7b171615680ea41e0e504f1abef72e6190bd5eb22661c6ab28470a18e42d9c3af1c0638ea89ee92b0fd5b2426ea6e29933e4ea7bcc77d5ae"' }>
                                            <li class="link">
                                                <a href="components/DecksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DecksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DecksDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DecksDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PublicRoutingModule.html" data-type="entity-link" >PublicRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StatsModule.html" data-type="entity-link" >StatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StatsModule-5f5bfd114afc81f5147baadca02c26829e25f775a6999cc098c410f4127c634cab8817bfd9e748e40068c9fc6cf05af940a02e350e61b399da5fa0fae59a4cf0"' : 'data-bs-target="#xs-components-links-module-StatsModule-5f5bfd114afc81f5147baadca02c26829e25f775a6999cc098c410f4127c634cab8817bfd9e748e40068c9fc6cf05af940a02e350e61b399da5fa0fae59a4cf0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StatsModule-5f5bfd114afc81f5147baadca02c26829e25f775a6999cc098c410f4127c634cab8817bfd9e748e40068c9fc6cf05af940a02e350e61b399da5fa0fae59a4cf0"' :
                                            'id="xs-components-links-module-StatsModule-5f5bfd114afc81f5147baadca02c26829e25f775a6999cc098c410f4127c634cab8817bfd9e748e40068c9fc6cf05af940a02e350e61b399da5fa0fae59a4cf0"' }>
                                            <li class="link">
                                                <a href="components/SDeckComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SDeckComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SGlobalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SGlobalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatsRoutingModule.html" data-type="entity-link" >StatsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserDashboardModule.html" data-type="entity-link" >UserDashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserDashboardModule-82ae69d521f9dc5d1176776861b0db8b0feb5bb6f1db7137086efe0fbb6140c91aac1d1bb3d56a29fcb6dc2555211ad71a87aac520234b3806ff884af08590ce"' : 'data-bs-target="#xs-components-links-module-UserDashboardModule-82ae69d521f9dc5d1176776861b0db8b0feb5bb6f1db7137086efe0fbb6140c91aac1d1bb3d56a29fcb6dc2555211ad71a87aac520234b3806ff884af08590ce"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserDashboardModule-82ae69d521f9dc5d1176776861b0db8b0feb5bb6f1db7137086efe0fbb6140c91aac1d1bb3d56a29fcb6dc2555211ad71a87aac520234b3806ff884af08590ce"' :
                                            'id="xs-components-links-module-UserDashboardModule-82ae69d521f9dc5d1176776861b0db8b0feb5bb6f1db7137086efe0fbb6140c91aac1d1bb3d56a29fcb6dc2555211ad71a87aac520234b3806ff884af08590ce"' }>
                                            <li class="link">
                                                <a href="components/DashboardLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidemenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidemenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserDashboardRoutingModule.html" data-type="entity-link" >UserDashboardRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Credentials.html" data-type="entity-link" >Credentials</a>
                            </li>
                            <li class="link">
                                <a href="classes/Deck.html" data-type="entity-link" >Deck</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDeck.html" data-type="entity-link" >PaginationDeck</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeckService.html" data-type="entity-link" >DeckService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Token.html" data-type="entity-link" >Token</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});