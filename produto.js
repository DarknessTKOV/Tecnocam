// produto.js - Funcionalidades da página de produto
document.addEventListener('DOMContentLoaded', function() {
    
    let galleryItems = [];
    let currentImageIndex = 0;

    // inicializar todos os módulos
    initQuantityControl();
    initGallery();
    initLightbox();
    initActionButtons();
    initColorSelection();
    initPurchaseButtons();
    initReviewModal();
    initMobileNavbar();
    
    // controle quantidade produto
    function initQuantityControl() {
        const qtyInput = document.getElementById('quantity');
        const minusBtn = document.querySelector('.qty-btn.minus');
        const plusBtn = document.querySelector('.qty-btn.plus');

        if (minusBtn && qtyInput) {
            minusBtn.addEventListener('click', () => {
                let value = parseInt(qtyInput.value);
                if (value > 1) {
                    qtyInput.value = value - 1;
                }
            });
        }

        if (plusBtn && qtyInput) {
            plusBtn.addEventListener('click', () => {
                let value = parseInt(qtyInput.value);
                qtyInput.value = value + 1;
            });
        }
    }

    // galeria imagens produto
    function initGallery() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const imageContainer = document.querySelector('.image-container');
        const originalActionButtons = document.querySelector('.action-buttons');

        galleryItems = Array.from(thumbnails);

        if (thumbnails.length > 0) {
            thumbnails[0].style.borderColor = 'var(--dourado)';
        }

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                thumbnails.forEach(thumb => thumb.style.borderColor = 'transparent');
                thumbnail.style.borderColor = 'var(--dourado)';
                currentImageIndex = index;
                updateMainImage(thumbnail, imageContainer, originalActionButtons);
            });
        });
    }

    // atualizar imagem principal
    function updateMainImage(thumbnail, container, actionButtons) {
        container.innerHTML = '';

        if (thumbnail.tagName === 'VIDEO') {
            const videoElement = document.createElement('video');
            videoElement.src = thumbnail.src;
            videoElement.controls = true;
            videoElement.autoplay = true;
            videoElement.muted = true;
            videoElement.style.width = '95%';
            videoElement.style.height = '95%';
            videoElement.style.objectFit = 'cover';
            videoElement.style.borderRadius = '20px';
            
            container.appendChild(videoElement);
            container.classList.add('has-video');
            
        } else {
            const imgElement = document.createElement('img');
            imgElement.id = 'mainImage';
            imgElement.src = thumbnail.src;
            imgElement.alt = thumbnail.alt;
            imgElement.style.maxWidth = '95%';
            imgElement.style.maxHeight = '95%';
            imgElement.style.objectFit = 'contain';
            
            container.appendChild(imgElement);
            container.classList.remove('has-video');
        }
        
        if (actionButtons) {
            container.appendChild(actionButtons);
            
            const zoomBtn = container.querySelector('.zoom-btn');
            if (zoomBtn) {
                const currentThumbnail = thumbnail;
                zoomBtn.onclick = function(e) {
                    e.stopPropagation();
                    const index = Array.from(galleryItems).indexOf(currentThumbnail);
                    openLightbox(index);
                };
            }
        }
    }

    // lightbox visualização ampliada
    function initLightbox() {
        const galleryLightbox = document.getElementById('galleryLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCounter = document.getElementById('lightboxCounter');
        const lightboxThumbnails = document.getElementById('lightboxThumbnails');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');

        // função configurar botão zoom
        function setupZoomButton() {
            const zoomBtn = document.querySelector('.zoom-btn');
            if (zoomBtn) {
                zoomBtn.replaceWith(zoomBtn.cloneNode(true));
                
                const newZoomBtn = document.querySelector('.zoom-btn');
                newZoomBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openLightbox(currentImageIndex);
                });
            }
        }

        // função criar miniaturas lightbox
        function createLightboxThumbnails() {
            if (!lightboxThumbnails) return;
            
            lightboxThumbnails.innerHTML = '';
            
            galleryItems.forEach((item, index) => {
                const thumb = document.createElement('img');
                thumb.className = 'lightbox-thumb';
                thumb.src = item.src;
                thumb.alt = item.alt;
                
                if (index === currentImageIndex) {
                    thumb.classList.add('active');
                }
                
                thumb.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateLightbox();
                });
                
                lightboxThumbnails.appendChild(thumb);
            });
        }

        // função abrir lightbox
        function openLightbox(index) {
            if (!galleryLightbox) return;
            
            currentImageIndex = index;
            updateLightbox();
            galleryLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // função fechar lightbox
        function closeLightbox() {
            if (!galleryLightbox) return;
            
            galleryLightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const video = lightboxImage.querySelector('video');
            if (video) {
                video.pause();
            }
        }

        // função atualizar lightbox
        function updateLightbox() {
            if (!lightboxImage || !galleryItems.length) return;
            
            const currentItem = galleryItems[currentImageIndex];
            lightboxImage.innerHTML = '';
            
            if (currentItem.tagName === 'VIDEO') {
                const video = document.createElement('video');
                video.src = currentItem.src;
                video.controls = true;
                video.autoplay = true;
                video.muted = true;
                video.style.maxWidth = '100%';
                video.style.maxHeight = '70vh';
                video.style.borderRadius = '12px';
                video.style.display = 'block';
                lightboxImage.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = currentItem.src;
                img.alt = currentItem.alt;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '70vh';
                img.style.objectFit = 'contain';
                img.style.borderRadius = '12px';
                img.style.display = 'block';
                lightboxImage.appendChild(img);
            }
            
            if (lightboxCounter) {
                lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryItems.length}`;
            }
            
            createLightboxThumbnails();
        }

        // função mostrar imagem anterior
        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox();
        }

        // função mostrar próxima imagem
        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            updateLightbox();
        }

        // event listeners
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
        if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && galleryLightbox && galleryLightbox.classList.contains('active')) {
                closeLightbox();
            }
            
            if (galleryLightbox && galleryLightbox.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });

        if (galleryLightbox) {
            galleryLightbox.addEventListener('click', (e) => {
                if (e.target === galleryLightbox) {
                    closeLightbox();
                }
            });
        }

        setupZoomButton();
    }

    // botões ação (favoritar, compartilhar)
    function initActionButtons() {
        const heartBtn = document.querySelector('.heart-btn');
        if (heartBtn) {
            heartBtn.replaceWith(heartBtn.cloneNode(true));
            
            const newHeartBtn = document.querySelector('.heart-btn');
            newHeartBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                const icon = this.querySelector('.material-symbols-outlined');
                icon.style.color = this.classList.contains('active') ? '#800020' : '#800020';
            });
        }

        const shareBtn = document.querySelector('.share-btn');
        if (shareBtn) {
            shareBtn.replaceWith(shareBtn.cloneNode(true));
            
            const newShareBtn = document.querySelector('.share-btn');
            newShareBtn.addEventListener('click', function() {
                if (navigator.share) {
                    navigator.share({
                        title: 'Fechadura Inteligente de Embutir com Biometria MFR 7000 Tecnocam',
                        text: 'Confira este produto incrível!',
                        url: window.location.href
                    }).catch(err => console.log('Erro ao compartilhar:', err));
                } else {
                    navigator.clipboard.writeText(window.location.href)
                        .then(() => alert('Link copiado para a área de transferência!'))
                        .catch(() => alert('Compartilhamento não disponível neste navegador'));
                }
            });
        }
    }

    // seleção cores produto
    function initColorSelection() {
        const colorButtons = document.querySelectorAll('.color-btn');
        colorButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                colorButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // botões compra
    function initPurchaseButtons() {
        const qtyInput = document.getElementById('quantity');
        
        const buyBtn = document.querySelector('.buy-btn');
        if (buyBtn) {
            buyBtn.addEventListener('click', function() {
                const quantity = qtyInput ? qtyInput.value : 1;
                const color = document.querySelector('.color-btn.active') ? 
                              document.querySelector('.color-btn.active').getAttribute('title') : 
                              'Preto';
                alert(`Compra realizada com sucesso!\nQuantidade: ${quantity}\nCor: ${color}\n\nVocê será redirecionado para o checkout.`);
            });
        }

        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', function() {
                const quantity = qtyInput ? qtyInput.value : 1;
                const color = document.querySelector('.color-btn.active') ? 
                              document.querySelector('.color-btn.active').getAttribute('title') : 
                              'Preto';
                alert(`Produto adicionado ao carrinho!\nQuantidade: ${quantity}\nCor: ${color}`);
            });
        }
    }

    // modal visualização imagens reviews
    function initReviewModal() {
        const modal = document.getElementById('modalImagem');
        const imagemModal = document.querySelector('.imagem-modal');
        const botaoFechar = document.querySelector('.botao-fechar');
        const imagensReviews = document.querySelectorAll('[data-lightbox]');

        if (imagensReviews.length > 0 && modal && imagemModal) {
            imagensReviews.forEach(img => {
                img.addEventListener('click', function() {
                    modal.classList.add('ativo');
                    imagemModal.src = this.src;
                    document.body.style.overflow = 'hidden';
                });
            });
        }

        if (botaoFechar && modal) {
            botaoFechar.addEventListener('click', function() {
                modal.classList.remove('ativo');
                document.body.style.overflow = 'auto';
            });
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('ativo');
                    document.body.style.overflow = 'auto';
                }
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('ativo')) {
                modal.classList.remove('ativo');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // navbar responsiva mobile
    function initMobileNavbar() {
        // função reorganizar navbar mobile
        function reorganizeNavbarMobile() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;
            
            if (navbar.querySelector('.nav-row') && window.innerWidth <= 768) {
                return;
            }
            
            if (window.innerWidth > 768) {
                restoreDesktopNavbar();
                return;
            }
            
            const allNavItems = Array.from(navbar.querySelectorAll('.nav-links, .nav-link'));
            const menuContainer = navbar.querySelector('.menu-container');
            
            const navbarParent = navbar.parentNode;
            const newNavbar = document.createElement('nav');
            newNavbar.className = 'navbar';
            
            if (menuContainer) {
                newNavbar.appendChild(menuContainer);
            }
            
            const firstRow = document.createElement('div');
            firstRow.className = 'nav-row';
            firstRow.append(...allNavItems.slice(0, 4));
            
            const secondRow = document.createElement('div');
            secondRow.className = 'nav-row';
            secondRow.append(...allNavItems.slice(4));
            
            newNavbar.appendChild(firstRow);
            newNavbar.appendChild(secondRow);
            
            navbarParent.replaceChild(newNavbar, navbar);
            
            setupMobileMenu();
        }

        // função restaurar navbar desktop
        function restoreDesktopNavbar() {
            const navbar = document.querySelector('.navbar');
            if (!navbar || !navbar.querySelector('.nav-row')) return;
            
            const navbarParent = navbar.parentNode;
            const originalNavbar = document.createElement('nav');
            originalNavbar.className = 'navbar';
            
            const menuContainer = navbar.querySelector('.menu-container');
            const navRows = navbar.querySelectorAll('.nav-row');
            
            if (menuContainer) {
                originalNavbar.appendChild(menuContainer);
            }
            
            const allLinks = [];
            navRows.forEach(row => {
                allLinks.push(...Array.from(row.children));
            });
            
            allLinks.forEach(link => {
                originalNavbar.appendChild(link);
            });
            
            navbarParent.replaceChild(originalNavbar, navbar);
        }

        // função configurar menu mobile
        function setupMobileMenu() {
            const menuIcon = document.querySelector('.menu-icon');
            const dropdownMenu = document.querySelector('.dropdown-menu');
            
            if (menuIcon && dropdownMenu) {
                const newMenuIcon = menuIcon.cloneNode(true);
                menuIcon.parentNode.replaceChild(newMenuIcon, menuIcon);
                
                const newDropdownMenu = dropdownMenu.cloneNode(true);
                dropdownMenu.parentNode.replaceChild(newDropdownMenu, dropdownMenu);
                
                const currentMenuIcon = document.querySelector('.menu-icon');
                const currentDropdown = document.querySelector('.dropdown-menu');
                
                currentMenuIcon.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openMobileMenu();
                });
                
                if (!document.querySelector('.menu-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'menu-overlay';
                    document.body.appendChild(overlay);
                }
                
                const overlay = document.querySelector('.menu-overlay');
                overlay.addEventListener('click', closeMobileMenu);
                
                const closeBtn = currentDropdown.querySelector('.dropdown-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', closeMobileMenu);
                }
                
                const dropdownItems = currentDropdown.querySelectorAll('.dropdown-item');
                dropdownItems.forEach(item => {
                    item.addEventListener('click', closeMobileMenu);
                });
            }
        }

        // função abrir menu mobile
        function openMobileMenu() {
            const dropdownMenu = document.querySelector('.dropdown-menu');
            const menuOverlay = document.querySelector('.menu-overlay');
            
            if (dropdownMenu) {
                dropdownMenu.classList.add('active');
                dropdownMenu.style.display = 'block';
            }
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                menuOverlay.style.display = 'block';
            }
            document.body.style.overflow = 'hidden';
        }

        // função fechar menu mobile
        function closeMobileMenu() {
            const dropdownMenu = document.querySelector('.dropdown-menu');
            const menuOverlay = document.querySelector('.menu-overlay');
            
            if (dropdownMenu) {
                dropdownMenu.classList.remove('active');
                dropdownMenu.style.display = 'none';
            }
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                menuOverlay.style.display = 'none';
            }
            document.body.style.overflow = '';
        }

        reorganizeNavbarMobile();
        
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                reorganizeNavbarMobile();
            }, 250);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
});